import { NextFunction, Request, Response } from "express"
import { UsersModel } from "../database/model/users.model";
import bcrypt from 'bcrypt';

export const loginRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        const user = await UsersModel.query().findOne({username})

        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: "Login Success", success: true });
          } else {
            res.status(400).json({ message: "Username or password wrong", success: false });
          }
    } catch (error) {
        next(error)
    }
}