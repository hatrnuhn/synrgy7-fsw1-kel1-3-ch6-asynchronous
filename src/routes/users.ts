import { Router } from 'express';
import { register } from '../controllers/authControllers';

const router = Router();

router.post('/', register);

export default router;