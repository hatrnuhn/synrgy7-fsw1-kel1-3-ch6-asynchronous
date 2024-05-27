import { loginRequest } from "../controllers/authControllers";
import express from "express";

export const authRouter = express.Router();

authRouter.post('/login', loginRequest);