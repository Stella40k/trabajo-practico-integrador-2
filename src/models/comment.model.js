import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
    content:{
        type: String,
        minlength: 5,
        maxlength: 500
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
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