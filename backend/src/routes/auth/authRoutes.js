import express from "express";
import * as AuthController from "../../controllers/auth/AuthController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();

router.post("/signup", checkJWT, AuthController.signup);
router.post("/login", checkJWT, AuthController.login);
router.post("/onboarding", checkJWT, attachUser, AuthController.onboarding);
