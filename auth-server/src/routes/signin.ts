import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { BadRequestError } from "../errors";
import { validateRequest } from "../middlewares";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    try {
      if (!existingUser) {
        throw new BadRequestError("Invalid Credentials");
      }
    } catch (error) {
      return next(error);
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    try {
      if (!passwordsMatch) {
        throw new BadRequestError("Invalid Credentials");
      }
    } catch (err) {
      return next(err);
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    res.status(200).send({user: existingUser, token: userJwt});
  }
);

export { router as signInRouter };
