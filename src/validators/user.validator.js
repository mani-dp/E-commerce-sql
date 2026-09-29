import { body } from "express-validator";

export const updateUserValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("role")
        .isIn(["USER", "ADMIN"])
        .withMessage("Role must be USER or ADMIN"),
];