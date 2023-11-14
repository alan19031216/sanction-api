import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError } from "sanction-common";
import { Admin } from "../models/admin";
import { Password } from "../services/password";
import { natsWrapper } from "../nats-wrapper";
import { AdminCreatedPublish } from "../events/publishers/admin-created-publisher";

const router = express.Router();

router.post(
    "/api/admins/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .notEmpty()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be between 4 and 20 characters long"),
        body("name").notEmpty().withMessage("Name cannot be empty"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password, name } = req.body;

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            throw new BadRequestError("Email in use", 409);
        }

        const { salt, hash } = await Password.toHash(password)

        const admin = Admin.build({ email, password: hash, salt, name })
        await admin.save()

        await new AdminCreatedPublish(natsWrapper.client).publish({
            id: admin.id,
            name: admin.name
        })

        res.send(admin);
    }
);

export { router as signupRouter };