import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest, BadRequestError } from "../middlewares";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    try {
      if (existingUser) {
        throw new BadRequestError("Email in use");
      }
    } catch (err) {
      return next(err);
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    res.status(201).send({ token: userJwt, user });
  }
);

export { router as signUpRouter };
