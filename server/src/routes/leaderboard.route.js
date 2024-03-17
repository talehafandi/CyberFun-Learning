import { Router } from 'express';
import controller from '../controllers/leaderboard.controller.js'
import access from '../middlewares/access.middleware.js';

const router = Router()

router.get('/', controller.list)
router.get('/refresh', controller.refresh)

export default router