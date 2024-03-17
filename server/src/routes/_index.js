import { Router } from 'express';
// routes
import auth from './auth.route.js'
import user from './user.route.js'

const router = Router()
router.use('/auth', auth)
router.use('/users', user)

export default router