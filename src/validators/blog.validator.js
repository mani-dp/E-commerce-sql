import { body } from "express-validator";

export const createBlogValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Blog title is required")
        .isLength({ min: 3, max: 200 })
        .withMessage("Blog title must be between 3 and 200 characters"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("Blog content is required"),

    body("image_url")
        .optional()
        .trim(),
];