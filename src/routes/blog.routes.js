import express from "express";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "../controllers/blog.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const blogRouter = express.Router();

blogRouter.get("/", getBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.post("/:id", authMiddleware, adminMiddleware, createBlog);
blogRouter.delete("/:id", authMiddleware, adminMiddleware, deleteBlog);
blogRouter.patch("/:id", authMiddleware, adminMiddleware, updateBlog);


export default blogRouter;