import { Router } from 'express';
// routes
import auth from './auth.route.js'
import user from './user.route.js'
import leaderboard from './leaderboard.route.js'
import challenge from './challenge.route.js'

const router = Router()
router.use('/auth', auth)
router.use('/users', user)
router.use('/leaderboard', leaderboard)
router.use('/challenges', challenge)

export default router