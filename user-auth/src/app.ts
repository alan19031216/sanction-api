import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { signupRouter } from "./routes/signup";
import { NotFoundError, errorHandler } from "sanction-common";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { validateTokenRouter } from "./routes/validate-token";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(validateTokenRouter)

// If dont have express-async-errors, express cannot return data which you need method two
app.all("*", async () => {
    throw new NotFoundError()
});

app.use(errorHandler);

export { app };
