import express, { Express, NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({ path: '../config/.env' })

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('token') as string;
        // console.log('hello');
        const checkToken = jwt.verify(token, process.env.SECRETE_KEY as string) as jwt.JwtPayload;
        if (checkToken) {
            next();
        } else {
            res.status(401).send('Login Required!!');
        }
    } catch (err: any) {
        if (err instanceof JsonWebTokenError) {
            res.status(401).send("you need to login again!!");
        } else {
            res.status(500).send(err.message);
        }
    }
}