import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { NotFoundError, errorHandler } from "sanction-common";
import { createRouter } from "./routes/create";
import { checkRouter } from "./routes/check";
import { listRouter } from "./routes/list";
import { createSanctionListRouter } from "./routes/create-un-sanction-list";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(createRouter)
app.use(checkRouter)
app.use(listRouter)
app.use(createSanctionListRouter)

// If dont have express-async-errors, express cannot return data which you need method two
app.all("*", async () => {
    throw new NotFoundError()
});

app.use(errorHandler);

export { app };
