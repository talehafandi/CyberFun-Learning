import { ApiError } from '../error/ApiError.js';
import jwt from '../utils/jwt.util.js'
import User from '../models/user.model.js'
import asyncMiddleware from './async.middleware.js';

const bypass = [
    '/api/v1/auth/login',
    '/api/v1/auth/signup',
    '/api/v1/auth/change-password',
    '/api/v1/auth/google-url',
    '/api/v1/auth/google',
    '/api/v1/auth/forgot-password',
    '/api/v1/auth/forgot-password/confirm',
]

const access = asyncMiddleware(async (req, res, next) => {
    console.log(req.path, bypass.includes(req.path))
    if (bypass.includes(req.path)) return next()

    let token = req.headers.authorization || (req.cookies?.token)
    if (!token) throw new ApiError('TOKEN_NOT_PROVIDED', 401)

    try {
        req.user = jwt.verify(token)
        const user = await User.findById(req.user.id)
        if (!user) return res.status(404).send({ message: 'USER_NOT_FOUND' })
        next()
    } catch (error) {
        let message = 'INVALID_TOKEN'
        if (error.message == 'jwt expired') message = 'TOKEN_EXPIRED'
        return res.status(401).send({ message })
    }
})

export default access