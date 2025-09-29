import { Router } from "express";
import {
    registerUser,
    login,
    getUserProfile,
    updateUserProfile,
    logout
} from "../controllers/auth.controller.js"
import { validateToken } from "../middlewares/authMiddleware.js";

export const authRouter = Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.get("profile", validateToken, getUserProfile );
authRouter.put("/profile", validateToken, updateUserProfile);
authRouter.post("/logout", logout);