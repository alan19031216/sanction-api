import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import { body } from "express-validator";
import { validateRequest, BadRequestError, requireAuth, NotAuthorizedError } from "sanction-common";

import { Admin } from "../models/admin";
import { SanctionDatabase } from "../models/sanction-database";

const router = express.Router();

router.post(
    "/api/sanction/create",
    requireAuth,
    [
        body("name").notEmpty().withMessage("Name cannot be empty"),
        body("price").isFloat().notEmpty().withMessage("Price must be number and cannot be empty"),
        body("currency").notEmpty().isLength({ min: 3, max: 3 }).withMessage("Name cannot be empty"),
        body("minimumQuantity").isInt().notEmpty().withMessage("MinimumQuantity must be number and cannot be empty")
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { name, price, currency, minimumQuantity, url } = req.body
        const admin = await Admin.findById(req.token!.id)

        if (!admin) {
            throw new NotAuthorizedError()
        }

        const sanctionDatabase = await SanctionDatabase.build({ name, price, currency, minimumQuantity, url })
        await sanctionDatabase.save()

        res.send(sanctionDatabase)
    }
);

export { router as createRouter };