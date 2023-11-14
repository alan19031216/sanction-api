import express, { Request, Response } from "express";
import { requireAuth } from "sanction-common";

import { Admin } from "../models/admin";

const router = express.Router();

router.get("/api/sanction/check/admin", requireAuth, async (req: Request, res: Response) => {
    const admin = await Admin.find()

    res.send(admin)
});

export { router as checkRouter };