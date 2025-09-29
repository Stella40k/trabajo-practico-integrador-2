import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const ArticleSchema = new Schema({
    title:{
        type: String,
        required: true,
        minLength: 3,
        maxlength: 200
    },
    content:{
        type: String,
        minLength: 5,
        maxlength: 50
    },
    excerpt:{
        type: String,
        minLength: 5,
        maxlength: 500
    },
    //a quien pertenece
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User' ,
        required: true
    },
    //m:m
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    }
},{
    timestamps: true,
    versionKey: false
});

export const articleModel = mongoose.model("Articles", ArticleSchema);