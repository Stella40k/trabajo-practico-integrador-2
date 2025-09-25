import { Router } from "express";
import{
    createArticle,
    allArticles,
    articleByID,
    articleUpdate,
    deleteArticle
} from "../controllers/article.controller.js"

export const articleRoute = Router();
articleRoute.post("/article", createArticle);
articleRoute.get("/articles", allArticles);
articleRoute.get("/article/:id", articleByID);
articleRoute.put("/article/:id", articleUpdate);
articleRoute.delete("/article/:id", deleteArticle);