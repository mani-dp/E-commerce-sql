import express from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminMiddleware } from "../middleware/admin.middleware";

const userRouter = express.Router();

userRouter.get('/', authMiddleware, adminMiddleware, getUsers)
userRouter.get('/:id', authMiddleware, adminMiddleware, getUserById)
userRouter.patch('/;id', authMiddleware, adminMiddleware, updateUser)
userRouter.delete('/:id', authMiddleware, adminMiddleware, deleteUser)

export default userRouter;