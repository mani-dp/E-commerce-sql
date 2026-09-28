import pool from "../db/database.js";

export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, stock, category_id } = req.body;

        const result = await pool.query(
            `INSERT INTO products
            (name, description, price, stock, category_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [name, description, price, stock, category_id]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT
                products.id,
                products.name,
                products.description,
                products.price,
                products.stock,
                products.image_url,
                products.created_at,
                categories.name AS category_name
            FROM products
            JOIN categories
                ON products.category_id = categories.id
            ORDER BY products.created_at DESC`,
        );
        res.status(200).json({
            success: true,
            data: result.rows,
        })
    } catch (err) {
        next(err)
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const result = await pool.query(
            `SELECT
                products.id,
                products.name,
                products.description,
                products.price,
                products.stock,
                products.image_url,
                products.created_at,
                categories.name AS category_name
            FROM products
            JOIN categories
                ON products.category_id = categories.id
            WHERE products.id = $1`, [id]
        );
        if (!result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Porduct not found",
            });
        };

        res.status(200).json({
            success: true,
            data: result.rows[0],
        })
    } catch (err) {
        next(err)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            description,
            price,
            stock,
            category_id,
            image_url,
        } = req.body;
        const result = await pool.query(
            `UPDATE products
             SET
                name = $1,
                description = $2,
                price = $3,
                stock = $4,
                category_id = $5,
                image_url = $6
             WHERE id = $7
             RETURNING *`,
            [description,
                price,
                stock,
                category_id,
                image_url,
                id]

        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        };

        res.status(200).json({
            success: true,
            data: result.rows[0],
        })
    } catch (err) {
        next(err)
    }
}

export const deleteProduct = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
             `DELETE FROM products
             WHERE id = $1
             RETURNING *`, [id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                success : false,
                message : "Product not found"
            });
        };

        res.status(200).json({
            success : true,
            data : result.rows[0],
        })
    } catch (err) {
        next(err)
    }
};