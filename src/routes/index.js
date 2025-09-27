import express from "express";
import { userRoutes } from "./user.route.js";
import { tagRouter } from "./tag.route.js";
import { commentRouter } from "./comment.route.js";
import { articleRoute } from "./article.route.js";
import { authRouter } from "./auth.route.js";

export const routes = express.Router();

routes.use(userRoutes);
routes.use(tagRouter);
routes.use(commentRouter);
routes.use(articleRoute);
routes.use(authRouter);