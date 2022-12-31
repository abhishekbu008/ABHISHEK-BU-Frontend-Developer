import express, { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors";
import { currentUser } from "../middlewares/current-user";
import instance from "../services/axios";

const router = express.Router();

router.get(
  "/api/spacex/query",
  currentUser,
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      if (!req.currentUser) {
        throw new BadRequestError("Invalid Credentials");
      }
      const response = await instance.get("", {
        params: req.query,
      });
      res.send(response.data);
    } catch (err) {
      return next(err);

    }
  }
);

export { router as queryRouter };
