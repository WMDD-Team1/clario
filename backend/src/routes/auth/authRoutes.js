import express from "express";
import { signupController } from "../../controllers/AuthController.js";
import { loginController } from "../../controllers/AuthController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

router.post("/signup", checkJWT, signupController);

router.post("/login", checkJWT, loginController);
