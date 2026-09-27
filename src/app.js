import express from "express";
import pool from "./db/database.js";

const app = express();
app.use(express.json());

app.get("/",  async(req, res, next)=> {
    try {
        const result = await pool.query("SELECT NOW()");
          res.json({
        success : true,
        message : "E-commerce SQL API",
        data : result.rows,
    })
    } catch (err) {
        next(err)   
    }
  
})

export default app;