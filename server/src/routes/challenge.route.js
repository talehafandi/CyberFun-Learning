import { Router } from 'express';
import controller from '../controllers/challenge.controller.js'

const router = Router()

router.get('/:id', controller.getOne)

export default router