import { Router } from "express";
import{
    createArticle,
    allArticles,
    articleByID,
    articleUpdate,
    deleteArticle
} from "../controllers/article.controller.js"
import { validateToken } from "../middlewares/authMiddleware.js";
import { ownerOrAdmin } from "../middlewares/ownerOrAdminMiddleware.js";
import { articleModel } from "../models/article.model.js";
import { createArticleValidation, updateArticleValidation, articleValidation } from "../middlewares/validations/article.validator.js";
import { validator } from "../middlewares/validator.js";

export const articleRoute = Router();
articleRoute.post("/article",  validateToken, createArticleValidation, validator, createArticle);//no publica
articleRoute.get("/articles", allArticles); //publico
articleRoute.get("/article/:id", articleValidation, validator,articleByID);//publico
articleRoute.put("/article/:id", validateToken, updateArticleValidation, validator, ownerOrAdmin(articleModel), articleUpdate);//no publico
articleRoute.delete("/article/:id", validateToken, ownerOrAdmin(articleModel), deleteArticle);//no publico