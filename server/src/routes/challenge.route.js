import { Router } from 'express';
import controller from '../controllers/challenge.controller.js'

const router = Router()

router.get('/:id', controller.getOne)
router.get('/start/:id/:username', controller.startChallenge)
router.get('/finish/:id/:username', controller.finishChallenge)

export default router