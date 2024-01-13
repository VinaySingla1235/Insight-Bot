import express from "express"
import {config} from "dotenv"
import morgan from "morgan"
import appRouter from "./routes/index.js";
import { Request, Response, NextFunction } from 'express';
import cookieParser from "cookie-parser";
config();
const app=express()

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(morgan("dev"))

app.use("/api/v1",appRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode: number = err.statusCode || 500;
    const message: string = err.message || 'Internal Server Error';
  
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
export default app;