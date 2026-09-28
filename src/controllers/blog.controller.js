import { json } from "express";
import pool from "../db/database.js";

export const createBlog = async (req, res, next) => {
    try {
        const { title, content, image_url } = req.body;

        const result = await pool.query(
            `INSERT INTO blogs
            (title, content, image_url, author_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *`, [title, content, image_url],
        );

        res.status(201).json({
            success: true,
            data: result.rows[0],
            message: "create blog was successfully",
        })
    } catch (err) {
        next(err)
    }
};

export const getBlogs = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT
                blogs.id,
                blogs.title,
                blogs.content,
                blogs.image_url,
                blogs.created_at,
                blogs.updated_at,
                users.id AS author_id,
                users.name AS author_name
             FROM blogs
             JOIN users
                ON blogs.author_id = users.id
             ORDER BY blogs.created_at DESC`,
        );
        res.status(200).json({
            success: true,
            data: result.rows,
            message: "blogs fetched is successfully",
        });
    } catch (err) {
        next(err);
    }
};

export const getBlogById = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const result = await pool.query(
            `SELECT
                blogs.id,
                blogs.title,
                blogs.content,
                blogs.image_url,
                blogs.created_at,
                blogs.updated_at,
                users.id AS author_id,
                users.name AS author_name
             FROM blogs
             JOIN users
                ON blogs.author_id = users.id
             WHERE blogs.id = $1`, [id],
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "blog not found",
            });
        };

        res.status(200).json({
            success: true,
            data: result.rows[0],
        })
    } catch (err) {
        next(err)
    }
};

export const updateBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content, image_url } = req.body;

        const result = await pool.query(
            `UPDATE blogs
             SET
                title = $1,
                content = $2,
                image_url = $3,
                updated_at = CURRENT_TIMESTAMP
             WHERE id = $4
             RETURNING *`, [title, content, image_url, id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "blog not found",
            });
        };

        res.status(200).json({
            success: true,
            data: result.rows[0],
            message: "blog updated successfully",
        })

    } catch (err) {
        next(err)
    }
};

export const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const result = await pool.query(
            `DELETE FROM blgos 
            WHERE id = $1
            RETURNING*`, [id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "blog not found",
            });
        };
        res.status(200).json({
            success : true,
            data : result.rows[0],
        })
    } catch (err) {
        next(err)
    }
}