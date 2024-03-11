import { ApiError } from '../error/ApiError.js';
import User from '../models/user.model.js'
import asyncMiddleware from '../middlewares/async.middleware.js'
import bcyrpt from 'bcrypt'
import crypto from 'crypto'
import jwt from '../utils/jwt.util.js'
import mailer from '../utils/mailer.util.js'

const signup = asyncMiddleware(async (req, res) => {
    const { email, password } = req.body
    let user = await User.findOne({ email: email })
    if (user && user.approved) throw new ApiError('USER_ALREADY_EXIST', 409)
    if (user && !user.approved) throw new ApiError('VERIFICATION_CODE_ALREADY_SENT', 408)

    const salt = await bcyrpt.genSalt(12)
    const hashedPass = await bcyrpt.hash(password, salt)

    const confirmationCode = crypto.randomInt(100000, 999999)
    const payload = { ...req.body, password: hashedPass, confirmationCode }
    user = await User.create(payload)

    await user.save()

    mailer.sendOTP(user.email, 'Account Confirmation Code', confirmationCode)

    return res.status(201).json({ 'message': 'Confirmation code sent to your email address!' })
})

const signupConfirm = asyncMiddleware(async (req, res) => {
    const { confirmationCode, email } = req.body

    const user = await User.findOne({ confirmationCode })
    if (!user) throw new ApiError('INCORRECT_OR_EXPIRED_CONFIRMATION_CODE', 400)
    if (user.email != email) throw new ApiError('EMAIL_DOES_NOT_MATCH', 400)

    user.approved = true
    user.confirmationCode = null

    await user.save()
    return res.status(201).json({ token: jwt.sign(user) })
})

const login = asyncMiddleware(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email }).select('+password')
    if (!user) throw new ApiError('INVALID_CREDENTIALS', 401)

    const isPasswordMatched = await bcyrpt.compare(password, user.password)
    if (!isPasswordMatched) throw new ApiError('INVALID_CREDENTIALS', 401)

    return res.status(200).json({ token: jwt.sign(user) })
})

export default {
    login,
    signup,
    signupConfirm,
}