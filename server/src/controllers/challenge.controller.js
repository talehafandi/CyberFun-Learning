import Challenge from '../models/challenge.model.js'
import User from '../models/user.model.js'

import { ChallengeStatus } from '../models/user.model.js'

import { ApiError } from '../error/ApiError.js';
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

const startChallenge = asyncMiddleware(async (req, res) => {
    const { id, username } = req.params
    console.log("req.params.id: ", req.params)
    const challenge = await Challenge.findById(id)
    if (!challenge) throw new ApiError('Challenge not found')

    
    const challengePayload = {
        challengeId: id,
        status: ChallengeStatus.INCOMPLETE,
        startAt: Date.now(),
        endedAt: null,
        score: 0
    }
    // not a good way to handle this error
    const user = await User.updateOne(
        { username },
        { $push: { challenges: challengePayload } }
    )
    if (!user) throw new ApiError('User not found')


    return res.status(201).json({ message: "Challenge started successfully", data: { challenge, user } })
})

const finishChallenge = asyncMiddleware(async (req, res) => {
    const { id, username } = req.params
    const { score } = req.body

    // const challenge = await Challenge.findById(id)
    // if (!challenge) throw new ApiError('Challenge not found')

    // must be improved
    //? return better error messages
    const user = await User.findOneAndUpdate(
        // find
        { 
            username: username, 
            "challenges.challengeId": id, 
            "challenges.status": ChallengeStatus.INCOMPLETE 
        },
        // update
        {
            $set: { 
                "challenges.$.status": ChallengeStatus.COMPLETE,
                "challenges.$.endedAt": Date.now(),
                "challenges.$.score": score
            },
            $inc: { totalScore: score }
        }

    )
    if (!user) throw new ApiError('Invalid payload')

    // console.log("user: ", user)

    res.status(201).json({ message: "Challenge completed successfully" })
})

export default {
    list,
    getOne,
    startChallenge,
    finishChallenge
}

