import express from 'express'
import { loginValidator, registerValidator } from '../validators/auth.validator.js';
import { validate } from '../middleware/validation.middleware.js';
import { login, register } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/register", registerValidator, validate, register);
authRouter.post('/login',loginValidator, validate, login);

export default authRouter;