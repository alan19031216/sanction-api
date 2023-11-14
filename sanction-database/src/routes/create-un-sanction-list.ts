import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import fs from 'fs';
import { body } from "express-validator";
import { validateRequest, BadRequestError, requireAuth, NotAuthorizedError, NotFoundError } from "sanction-common";

import { Admin } from "../models/admin";
import { SanctionDatabase } from "../models/sanction-database";

const router = express.Router();


router.post(
    "/api/sanction-list/create/un",
    requireAuth,
    [
        body('sanctionDatabaseId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('SanctionDatabaseId must be provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { sanctionDatabaseId } = req.body
        const admin = await Admin.findById(req.token!.id)
        if (!admin) {
            throw new NotAuthorizedError()
        }

        const sanctionDatabase = await SanctionDatabase.findById(sanctionDatabaseId)
        if (!sanctionDatabase) {
            throw new NotFoundError("Sanction database not found")
        }

        fs.readFile(`D:/sanction-api/sanction-database/src/routes/xm.xml`, 'utf8', (err, data) => {
            if (err) {
                // Handle the error
                throw err;
            }

            // Log the contents of the file
            console.log(data);

            // for()
            let sanction = {}

            res.send(admin)
        });
    }
);

export { router as createSanctionListRouter };