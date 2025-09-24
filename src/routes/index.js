import express from "express";
import { userRoutes } from "./user.route.js";
import { tagRouter } from "./tag.route.js";

export const routes = express.Router();

routes.use(userRoutes);
routes.use(tagRouter);