import express from "express";
import { SignupSchema } from "../../schemas/auth.schemas.js";
import { validate } from "../../middlewares/validate.js";
import { signupController } from "../../controllers/auth.controller.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

router.post("/signup", checkJWT, validate(SignupSchema), signupController);
