import express from "express";
import cors from "cors"

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signUpRouter } from "./routes/signup";
import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares";
import { queryRouter } from "./routes/query";

const app = express();
app.use(express.json());

app.use(cors())

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(queryRouter)

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
