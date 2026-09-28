import pool from "../db/database.js";

export const addFavorite = async (request, response, next) => {
    try {
        const { user_id, product_id } = request.body;

        if (!user_id || !product_id) {
            return response.status(400).json({
                success: false,
                message: "product ID is required"
            });
        };
        const result = await pool.query(
            `INSERT INTO favorites (user_id, product_id)
             VALUES ($1, $2)
             RETURNING *`, [user_id, product_id],
        );
        response.status(201).json({
            success: true,
            data: result.rows[0],
        })
    } catch (err) {
        next(err)
    }
};

export const getUserFavorites = async (request, response, next) => {
    try {
        const { user_id } = req.params;
        const result = await pool.query(
            `SELECT
                products.id,
                products.name,
                products.price,
                products.image_url,
                categories.name AS category_name,
                favorites.created_at AS favorited_at
             FROM favorites
             JOIN products
                ON favorites.product_id = products.id
             JOIN categories
                ON products.category_id = categories.id
             WHERE favorites.user_id = $1
             ORDER BY favorites.created_at DESC`,
            [user_id],
        );
        response.status(200).json({
            success: true,
            data: result.rows,
        })
    } catch (err) {
        next(err)
    }
}

export const removeFavorite = async (request, response, next) => {
    try {
        const { user_id, product_id } = request.params;

        const result = await pool.query(
            `DELETE FROM favorites
             WHERE user_id = $1
             AND product_id = $2
             RETURNING *`, [user_id, product_id],
        );
        if (result.rows.length === 0) {
            return response.status(404).json({
                success: false,
                message: "Favorite not found",
            });
        };
        response.status(200).json({
            success: true,
            message: "Favorite removed successfully",
        })
    } catch (err) {
        next(err)
    }
}