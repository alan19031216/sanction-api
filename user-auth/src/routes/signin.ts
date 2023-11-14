import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequestError, Jwt } from "sanction-common";

import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
    "/api/users/signin",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .notEmpty()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be between 4 and 20 characters long"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            throw new BadRequestError("Email not found", 404);
        }

        const passwordsMatch = await Password.compare(
            user.password,
            password
        );
        if (!passwordsMatch) {
            throw new BadRequestError("Password not match", 401);
        }

        const { jwt } = await Jwt.toGenerate(user.id, user.email)

        res.send({ 'accessToken': jwt });
    }
);

export { router as signinRouter };