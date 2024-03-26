import { ApiError } from '../error/ApiError.js';
import Challenge from '../models/challenge.model.js'
import asyncMiddleware from '../middlewares/async.middleware.js'
import filter from '../utils/filter.util.js'

const list = asyncMiddleware(async (req, res) => {
    // const { filter, offset } = filter(req)
    const challenges = await Challenge.find()
    return res.status(201).json(challenges)
})

const getOne = asyncMiddleware(async (req, res) => {
    const id = req.params.id
    const challenge = await Challenge.findById(id)
    if (!challenge) throw new ApiError('Challenge not found')
    
    return res.status(201).json(challenge)
})

export default {
    list,
    getOne
}

