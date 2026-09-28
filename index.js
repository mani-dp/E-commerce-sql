import app from "./src/app.js"

const PORT = 3000;


app.get("/", async (req, res, next) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            success: true,
            message: "E-commerce SQL API",
            data: result.rows,
        })
    } catch (err) {
        next(err)
    }

})

app.listen(PORT, () => {
    console.log(`server runing on port ${PORT}`);
})