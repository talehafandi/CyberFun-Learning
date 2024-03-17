import { ApiError } from '../error/ApiError.js';
import User from '../models/user.model.js'
import asyncMiddleware from '../middlewares/async.middleware.js'
import filter from '../utils/filter.util.js'

const refresh = asyncMiddleware(async (req, res) => {
    const aggregate = [ 
        { 
            $setWindowFields: {
                sortBy: { totalScore: -1 },
                output: { rank: { $denseRank: {} } }
            }
        },
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