import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const ArticleSchema = new Schema({
    title:{
        tyor: String,
        minlength: 2,
        maxlength: 200
    },
    content:{
        type: String,
        minlength: 5,
        maxlength: 50
    },
    excerpt:{
        type: String,
        minlength: 5,
        maxlength: 500
    },
    //a quien pertenece
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    //m:m
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});

export const articleModel = mongoose.model("Articles", ArticleSchema);