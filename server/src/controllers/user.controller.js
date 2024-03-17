import { ApiError } from '../error/ApiError.js';
import User from '../models/user.model.js'
import asyncMiddleware from '../middlewares/async.middleware.js'
import filter from '../utils/filter.util.js'

// return fields by requester's role 
const list = asyncMiddleware(async (req, res) => {
    const { limit, offset } = filter(req)

    const aggregate = [ 
        { 
            $setWindowFields: {
                sortBy: { score: -1 },
                output: { rank: { $denseRank: {} } }
            }
        }
    ]
    const users = await User.aggregate(aggregate)
    
    console.log("users: ", users)

    const data = await User.find().sort({ score: -1 }).limit(limit).skip(offset);
    return res.status(201).json(data);
})

const getOne = asyncMiddleware(async (req, res) => {
    const username = req.params.username

    const user = await User.findOne({ username: username })
    if (!user) throw new ApiError('User not found', 404)


    // const aggregate = [ { $sort: { "score": -1 } }, { $project: { "score": 1 } } ]
    const aggregate = [ 
        { 
            $setWindowFields: {
                sortBy: { score: -1 },
                output: { rank: { $denseRank: {} } }
            }
        }
    ]
    const users = await User.aggregate(aggregate)

    console.log("users: ", users)
    
    // add authorization

    return res.status(201).json(user)
})

const update = asyncMiddleware(async (req, res) => {
    const username = req.params.username
    const payload = req.body // use spread if payload will be changed

    const user = await User.findOneAndUpdate({username: username}, payload, { new: true })
    if (!user) throw new ApiError('User not found', 404)
    console.log("user: ", user)
    return res.status(201).json(user)
})

const remove = asyncMiddleware(async (req, res) =>{
    const username = req.params.username
    
    const user = await User.findOne({ username })
    if (!user) throw new ApiError('User not found', 404)

    // add authorization before deleting

    await User.findOneAndDelete({ username })
    // await User.deleteMany({})

    return res.status(201).json({ message: "Account Deleted", user })
})

export default {
    list,
    getOne,
    update,
    remove
}