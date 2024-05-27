import { NextFunction, Request, RequestHandler, Response } from "express"
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

export const register: RequestHandler = async (req, res) => {
  try {
    const newUser = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10)
    } 
    await UsersModel.query().insert(newUser);

    res.status(201).json({ status: 'Created', message: 'success'})
  } catch (err) {
    res.status(500).json({
      status: 'Error',
      message: JSON.stringify(err)
    })
  }
}