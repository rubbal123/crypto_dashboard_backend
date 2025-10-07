// src/controllers/auth.controller.ts
import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserService } from "../services/user.service";

const userService = new UserService();
const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret";

// Updated login function
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation (you can replace this with Joi or zod validators later)
    //   if (!name || !email || !password) {
    //     return res.status(400).json({ message: 'Name, email and password are required.' });
    //   }

    const user = await userService.signup({ name, email, password });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "User created successfully", token });
  } catch (error: any) {
    if (error.message === "Email already exists") {
      return res.status(400).json({ message: error.message });
    }

    next(error);
  }
};
