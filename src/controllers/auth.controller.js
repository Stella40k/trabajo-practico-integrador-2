import { validationResult } from "express-validator";
import { generateToken } from "../helpers/jwt.helper.js";
import { comparePasswords, hashPassword } from "../helpers/bcrypt.helper.js";
import { userModel } from "../models/user.model.js";

export const registerUser = async(req, res)=>{
    try {
        const {username, email, role, password, profile } = req.body

        //constante nueva q espera la contrasela para hashear
        const hashedPassword = await hashPassword(password);

        const userWhithPassword = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role,
            profile
        }).select('-password');
        res.status(201).json({
            ok: true,
            msg:"Usuario creado",
            data: hashedPassword
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Ocurrio un error en el servidor"
        });
    }
};
export const login = async(req, res)=>{
    try {
        const{username, password}=req.body;
        const user = await userModel.findOne({
            username
        });
        //console.log(user);
        if(!user){
            return res.status(404).json({
                msg: "El usuario o contraseña no coinciden"
            });
        };
        const isMatch = await comparePasswords(password, user.password);
        if(!isMatch){
            return res.status(404).json({
                msg: "El usuario o contraseña no coinciden"
            });
        }
        const token = generateToken(user);

        res.cookie("token", token,{
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        });
        return res.status(200).json({
            ok: true,
            msg: "Logeado correctamente, bienvenido"
        });
    } catch (error) {
        //console.log(error);
        return res.status(501).json({
            msg: "Error interno del servidor"
        });
    }
};
export const getUserProfile = async(req, res)=>{
    try {
        res.status(200).json({
            ok: true,
            msg: "Perfil autenticado",
            user: req.user
        });
    } catch (error) {
        console.log("Error get userPRofile", role);
        res.status(500).json({
            ok: false,
            msg: "Error interno del servidor"
        });
    }
};
export const updateUserProfile = async(req, res)=>{
    try {
        const userId = req.userLog.id; 
        const{firstName, lastName, biography, avatarUrl, birthDate}=req.body.profile;
        const updateProfile = await userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'profile.firstName': firstName,
                    'profile.lastName': lastName,
                    'profile.biography': biography,
                    'profile.avatarUrl': avatarUrl,
                    'profile.birthDate': birthDate
                }
            },
            {
                new: true,
                runValidators: true
            }
        ).select('-password');
        return res.status(200).json({
            ok: true,
            msg: "Perfil actualizado",
            data: updateProfile
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar el perfil"
        });  
    }
};
export const logout = async(req, res)=>{
    try {
        res.clearCookie("token");
        return res.jso({
            msg: "Sesion cerrada"
        });
    } catch (error) {
        //console.log(error)
        return res.json({
            msg: "Error al cerrar sesion"
        });
    }
};

//agregar las cosas q pusieron en el archivo