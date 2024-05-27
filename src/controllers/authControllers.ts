import { NextFunction, Request, RequestHandler, Response } from "express"
import { UsersModel } from "../database/model/users.model";
import bcrypt from 'bcrypt';

export const loginRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, password} = req.body;
        const user = await UsersModel.query().where({username});

        if (!user) {
          res.status(404).json({
            status: 'Not Found',
            message: 'User is not found'
          })
        }

        if (user && bcrypt.compareSync(password, user[0].password)) {
            res.status(200).json({ status: "Success", message: "Login Success" });
        } else {
            res.status(400).json({ status: "Bad Request", message: "Username or password wrong" });
        }
    } catch (error) {
      return res.status(500).json({
        status: 'Success',
        messagge: 'Successfully logged-in'
      })
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