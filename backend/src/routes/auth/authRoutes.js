import express from "express";
import * as AuthController from "../../controllers/AuthController.js";
import { checkJWT } from "../../middlewares/checkJWT.js";

export const router = express.Router();

router.post("/signup", checkJWT, AuthController.signup);
router.post("/login", checkJWT, AuthController.login);
