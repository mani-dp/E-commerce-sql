import { body } from "express-validator";

export const createProductValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required"),

    body("description")
        .optional()
        .trim(),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),

    body("stock")
        .notEmpty()
        .withMessage("Stock is required")
        .isInt({ min: 0 })
        .withMessage("Stock must be a positive integer"),

    body("category_id")
        .notEmpty()
        .withMessage("Category ID is required")
        .isUUID()
        .withMessage("Category ID must be a valid UUID"),

    body("image_url")
        .optional()
        .trim(),
];