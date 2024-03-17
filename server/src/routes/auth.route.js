import { Router } from 'express';
import controller from '../controllers/auth.controller.js'
import access from '../middlewares/access.middleware.js';

const router = Router()

// for unregistered users
router.post('/signup', controller.signup)
router.post('/login', controller.login)
// router.post('/signup-confirm', controller.signupConfirm)

// router.use(access)

export default router