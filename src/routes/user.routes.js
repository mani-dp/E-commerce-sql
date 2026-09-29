import express from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";
import { updateUserValidator } from "../validators/user.validator.js";
import { validate } from "../middleware/validation.middleware.js";

const userRouter = express.Router();

userRouter.get('/', authMiddleware, adminMiddleware, getUsers)
userRouter.get('/:id', authMiddleware, adminMiddleware, getUserById)

userRouter.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateUserValidator,
    validate,
    updateUser
);

userRouter.delete('/:id', authMiddleware, adminMiddleware, deleteUser)

export default userRouter;