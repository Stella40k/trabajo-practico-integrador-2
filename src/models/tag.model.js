import mongoose from "mongoose";
const {Schema, model} = mongoose;

const TagModel = new Schema({
    name:{
        type: String,
        require: true,
        unique: true,
        maxlength: 30,
        minlength: 2,
        trim: true,
        match: [/^\S+$/, "La etiqueta no puede contener espacios"],
    },
    description:{
        type: String,
        maxlength: 200,
        minlength:2
    },
},{
    versionKey: false,
    timestamps: true
});
export const tagModel = mongoose.model("Tag", TagModel);

