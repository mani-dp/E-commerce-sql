import express from 'express'
import registerValidator from '../validators/auth.validator.js';
import { validate } from '../middleware/validation.middleware.js';
import { register } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post(
    "/register",
    registerValidator,
    validate,
    register
);

export default authRouter;