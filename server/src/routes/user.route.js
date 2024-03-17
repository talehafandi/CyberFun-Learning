import { Router } from 'express';
import controller from '../controllers/user.controller.js'
import access from '../middlewares/access.middleware.js';

const router = Router()

router.get('/', controller.list)
router.get('/:username', controller.getOne)
router.patch('/:username', controller.update)
router.delete('/:username', controller.remove)

export default router