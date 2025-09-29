import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
    content:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    article:{
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true 
    }
},{
    timestamps: true,
    versionKey: false
});

export const commentModel = mongoose.model("Comment", CommentSchema)