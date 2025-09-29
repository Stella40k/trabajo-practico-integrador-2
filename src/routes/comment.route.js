import { Router } from "express";
import{
    createComment,
    allComents,
    updateComment,
    deleteComment,
    getCommentsByArticle,
    getUserLogComments
} from "../controllers/comment.controller.js"
import { validateToken } from "../middlewares/authMiddleware.js";
import { ownerOrAdmin } from "../middlewares/ownerOrAdminMiddleware.js";
import {
  createCommentValidation,
  deleteCommentValidation,
  getCommentsByArticleValidation,
  updateCommentValidation,
} from "../middlewares/validations/comment.validator.js";
import { validator } from "../middlewares/validator.js";


export const commentRouter = Router();
commentRouter.get("/comment/myComments", validateToken, getUserLogComments);
commentRouter.post("/comments", validateToken, createCommentValidation, validator, createComment);
commentRouter.get("comments", validateToken, allComents);//para ver los coments de un articulo
commentRouter.get("comments/article/:articleId", validateToken, getCommentsByArticleValidation, validator, getCommentsByArticle);
commentRouter.put("/comment/:id", validateToken, ownerOrAdmin, updateCommentValidation, validator,  updateComment);
commentRouter.delete("/comment/:id", validateToken, ownerOrAdmin, deleteCommentValidation, validator, deleteComment);