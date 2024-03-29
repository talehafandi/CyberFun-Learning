import { ApiError } from '../error/ApiError.js';
import User from '../models/user.model.js'
import asyncMiddleware from '../middlewares/async.middleware.js'
import filter from '../utils/filter.util.js'

const refresh = asyncMiddleware(async (req, res) => {
    const aggregate = [
        // find rank of each document and ouput it
        {
            $setWindowFields: {
                sortBy: { totalScore: -1 },
                output: { rank: { $denseRank: {} } }
            },
        },
        // find next user of each user by totalScore
        {
            $lookup: {
                from: "users",
                let: { foreignTotalScore: "$totalScore" },
                pipeline: [
                    // filter out docs with less totalScore
                    { $match: { $expr: { $gt: ["$totalScore", "$$foreignTotalScore"] } } },
                    // sort descending order and limit to 1 to pick only next document
                    { $sort: { totalScore: 1 } }, 
                    { $limit: 1 },
                    { $project: { _id: 1 } }
                ],
                as: "nextUser"
            }
        },
        // write next user id to nextUser field in each document (except top1)
        {
            $set: {
                nextUser: { $arrayElemAt: ["$nextUser._id", 0] }
            }
        },
        // merge output of prev stage with the document
        {
            $merge: {
                into: "users",
                on: "_id",
                whenMatched: "replace"
            }
        }
    ]
    await User.aggregate(aggregate)

    return res.status(201).json({ message: "List updated successfully" })
})

const list = asyncMiddleware(async (req, res) => {
    const { limit, offset } = filter(req)

    const data = await User.find({}, { rank: 1, username: 1, totalScore: 1, avatar: 1 })
        .sort({ totalScore: -1 })
        .limit(limit)
        .skip(offset)
    return res.status(201).json(data);
})

export default {
    refresh,
    list,
}