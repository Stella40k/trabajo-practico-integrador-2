import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { userModel } from "./user.model.js";
import {articleModel} from "./article.model.js"

const CommentSchema = new Schema({
    content:{
        type: String,
        minlength: 5,
        maxlength: 500
    },
    author:{
        //ref: a user
    },
    article:{
        //ref: a article
    },
    article:{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
},{
    timestamps: true,
    versionKey: false
});

export const commentModel = mongoose.model("Comments", CommentSchema)