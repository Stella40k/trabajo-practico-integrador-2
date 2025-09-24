import mongoose  from "mongoose";
const { Schema, model } = mongoose;


//perfil agregado, el hijo
const ProfileSchema = new Schema({
    firstName:{
        type: String,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    lastName:{
        type: String,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    biography:{
        type: String,
        minlength: 2,
        maxlength: 500
    },
    avatarUrl:{
        type: String,
        match:[/^https?:\/\/.+\..+$/]
    },
    birthDate:{
        type: Date
    },
});



const UserSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/],
        lowercase: true, //es para q acepten minusculas 
        trim: true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    password:{
        type: String,
        required: true,
        select: false,
        minlength: 6
    },
    profile: ProfileSchema
},{
    versionKey: false,
    timestamps: true
});

export const userModel = mongoose.model("User", UserSchema);