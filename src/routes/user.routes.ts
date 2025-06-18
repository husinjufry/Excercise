import express from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/', authenticate, getUsers);
router.get('/:id', authenticate, getUser);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;