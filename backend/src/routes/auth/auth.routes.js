import express from "express";
// Added new schema imports for login and profile validation
import { SignupSchema } from "../../schemas/auth.schemas.js";
import { validate } from "../../middlewares/validate.js";
// Added new controller imports for login and profile functionality
import { signupController } from "../../controllers/auth.controller.js";
import { loginController } from "../../controllers/auth.controller.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

router.post("/signup", checkJWT, validate(SignupSchema), signupController);

router.post("/login", checkJWT, loginController);
