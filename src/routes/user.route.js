import express from "express";
import{
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js"

export const userRoutes = express.Router();
userRoutes.get('/users', getAllUsers);
userRoutes.get('/user/:id', getUser);
userRoutes.put('/user/:id', updateUser);
userRoutes.delete('/user/:id', deleteUser);
