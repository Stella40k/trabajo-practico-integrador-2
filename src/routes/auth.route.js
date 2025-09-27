import { Router } from "express";
import {
    registerUser,
    login,
    getUserProfile,
    //updateUserProfile
    logout
} from "../controllers/auth.controller.js"

export const authRouter = Router();
authRouter.post("/register", registerUser);
authRouter.post("/login", login);
authRouter.get("profileAutenticate",getUserProfile );
//authRouter.put("/profile", updateUserProfile);
authRouter.post("/logout", logout);