import express from "express";
// Added new schema imports for login and profile validation
import { SignupSchema } from "../../schemas/SignupSchema.js";
import { validate } from "../../middlewares/validate.js";
import { signupController } from "../../controllers/AuthController.js";
import { loginController } from "../../controllers/AuthController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

router.post("/signup", checkJWT, validate(SignupSchema), signupController);

router.post("/login", checkJWT, loginController);
