import pool from "../db/database"

export const getUsers = async (req, res, next) => {
    try {
        const result = await pool.query(
            `SELECT
                id,
                name,
                email,
                role,
                created_at
             FROM users
             ORDER BY created_at DESC`
        );
        res.status(200).json({
            success: true,
            data: result.rows,
            message: "users fetched successfully",
        })
    } catch (err) {
        next(err)
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const result = await pool.query(
            `SELECT
                id,
                name,
                email,
                role,
                created_at
             FROM users
             WHERE id = $1`, [id],
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        };

        res.status(200).json({
            success: true,
            data: result.rows[0],
            message: "user fetched successfully",
        })
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const { name, email, role } = req.body;
        const result = await pool.query(
            `UPDATE users
             SET
                name = $1,
                email = $2,
                role = $3
             WHERE id = $4
             RETURNING
                id,
                name,
                email,
                role,
                created_at`, [name, email, role, id],
        );


        res.status(200).json({
            success: true,
            data: result.rows[0],
            message: "user updated successfully",
        })
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params.id;
        const result = await pool.query(
            `DELETE FROM users
             WHERE id = $1
             RETURNING
                id,
                name,
                email,
                role`, [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            });
        };
        res.status(200).json({
            success: true,
            data: result.rows[0],
            message: "user deleted successfully",
        })

    } catch (err) {
        next(err)
    }
}