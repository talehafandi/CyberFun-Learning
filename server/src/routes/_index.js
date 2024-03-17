import { Router } from 'express';
// routes
import auth from './auth.route.js'
import user from './user.route.js'
import leaderboard from './leaderboard.route.js'

const router = Router()
router.use('/auth', auth)
router.use('/users', user)
router.use('/leaderboard', leaderboard)

export default router