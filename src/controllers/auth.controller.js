import { validationResult } from "express-validator";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePasswords } from "../helpers/bcrypt.helper.js";
import { userModel } from "../models/user.model.js";

export const registerUser = async(req, res)=>{
    try {
        const {username, email, role, password, profile } = req.body

        const newUser = await userModel.create({
            username,
            email,
            password,
            role,
            profile
        })
        res.status(201).json({
            ok: true,
            msg:"Usuario creado",
            data: newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Ocurrio un error en el servidor"
        });
    }
};