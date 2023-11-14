import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import { param } from "express-validator";
import { validateRequest, BadRequestError, requireAuth, NotAuthorizedError, NotFoundError } from "sanction-common";

import { Admin } from "../models/admin";
import { SanctionDatabase } from "../models/sanction-database";

const router = express.Router();

router.get(
    "/api/sanction/list",
    requireAuth,
    validateRequest,
    async (req: Request, res: Response) => {
        const sanctionDatabase = await SanctionDatabase.find()
        res.send(sanctionDatabase)
    }
);

router.get(
    "/api/sanction/list/:sanctionDatabaseId",
    requireAuth,
    [
        param('sanctionDatabaseId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('SanctionDatabaseId must be provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { sanctionDatabaseId } = req.params

        const sanctionDatabase = await SanctionDatabase.findById(sanctionDatabaseId)
        if (!sanctionDatabase) {
            throw new NotFoundError("Sanction database not found")
        }

        res.send(sanctionDatabase)
    }
);

export { router as listRouter };