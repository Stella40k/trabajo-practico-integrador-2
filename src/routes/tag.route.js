import { Router } from "express";
import{
    createTag,
    allTags,
    TagById,
    updateTag,
    deleteTag
} from "../controllers/tag.controller.js";

export const tagRouter = Router();
tagRouter.post("/tag", createTag);
tagRouter.get("/tags", allTags );
tagRouter.get("/tag/:id", TagById);
tagRouter.put("/tag/:id", updateTag);
tagRouter.delete("/tag/:id", deleteTag); 