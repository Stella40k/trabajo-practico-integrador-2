import { Router } from "express";
import{
    createComment,
    allComents,
    getComment,
    updateComment,
    deleteComment
} from "../controllers/comment.controller.js"

export const commentRouter = Router();
commentRouter.post("/comment", createComment);
commentRouter.get("/comments", allComents);
commentRouter.get("/comment/:id", getComment);
commentRouter.put("/comment/:id", updateComment);
commentRouter.delete("/comment/:id", deleteComment);