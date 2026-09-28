import pool from "../db/database.js";

export const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        const result = await pool.query(
            `INSERT INTO categories (name)
             VALUES ($1)
             RETURNING *`,
            [name]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0],
        });
    } catch (err) {
        next(err);
    }
};

export const getCategories = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM categories
             ORDER BY created_at DESC`
        );
        res.status(200).json({
            success: true,
            data: result.rows,
        })
    } catch (err) {
        next(err)
    }
};

export const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;


        const result = await pool.query(
            `SELECT *
             FROM categories
             WHERE id = $1`, [id],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "category not found",
            })
        }

        res.status(200).json({
            success: true,
            data: result.rows[0],
        })
    } catch (err) {
        next(err)
    };
};

export const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await pool.query(
            `UPDATE categories
             SET name = $1
             WHERE id = $2
             RETURNING *`, [name, id],
        )

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        };
        res.status(200).json({
            success: true,
            message: "Category updated successfully",

            data: result.rows[0],
        })
    } catch (err) {
        next(err)
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `DELETE FROM categories
             WHERE id = $1
             RETURNING *`,
            [id]
        );
        if (result.rows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });

        };
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: result.rows[0],
        })
    } catch (err) {
        next(err)
    }
}