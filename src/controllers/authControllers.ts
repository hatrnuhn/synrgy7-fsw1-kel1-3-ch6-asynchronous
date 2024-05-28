import { NextFunction, Request, RequestHandler, Response } from "express"
import { UsersModel } from "../database/model/users.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login: RequestHandler = async (req, res) => {
    try {
        const {username, password} = req.body;
        const users = await UsersModel.query().where({username});

        if (!users.length) {
          return res.status(404).json({
            status: 'Not Found',
            message: 'User is not found'
          })
        }

        const user = users[0];
        if (user && bcrypt.compareSync(password, user.password)) {
          const payload = {
            username: user.username,
            role: user.role
          }

          const token = jwt.sign(payload, 'secret', { expiresIn: '30d' });
          res.status(200).json({ status: "Success", message: "Login Success", token });
        } else {
            res.status(400).json({ status: "Bad Request", message: "Username or password wrong" });
        }
    } catch (error) {
      res.status(500).json({
        status: 'Error',
        message: error
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