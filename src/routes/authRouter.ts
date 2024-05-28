import { login } from "../controllers/authControllers";
import { register } from '../controllers/authControllers';
import express from "express";

export const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);