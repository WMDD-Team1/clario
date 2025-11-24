import express from "express";
import * as AuthController from "../../controllers/auth/AuthController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";
import { attachUser } from "../../middlewares/attachUser.js";

export const router = express.Router();
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/me", checkJWT, attachUser, AuthController.getUser);
router.post("/onboarding", checkJWT, attachUser, AuthController.onboarding);
router.post("/google", AuthController.googleLogin);
