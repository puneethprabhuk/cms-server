import express from 'express';
import { getUser, updateUser, createUser, signIn } from '../controllers/user.js';
import auth from '../middleware/auth.js';


const userRouter = express.Router();

userRouter.get('/:id', getUser);

userRouter.post('/', createUser);

userRouter.patch('/:id', updateUser);

userRouter.post('/signIn', signIn);

export default userRouter;