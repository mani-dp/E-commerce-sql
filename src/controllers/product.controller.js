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