import { articleModel } from "../../models/article.model.js";
import { tagModel } from "../../models/tag.model.js";
import { userModel } from "../../models/user.model.js";
import { body, param } from "express-validator";

export const createArticleValidation =[
    body("title")
        .notEmpty().withMessage("El titulo del articulo es obligatorio")
        .isString().withMessage("El titulo debe ser una cadena de texto")
        .isLength({
            min: 3,
            max: 200
        }).withMessage("El titulo debe tener entre 3 y 200 caracteres"),
    body("content")
        .notEmpty().withMessage("El contenido del articulo es obligatorio")
        .isString().withMessage("El contenido debe ser una cadena de texto")
        .isLength({min: 10}).withMessage("El extracto debe tener al menos 10 caracteres"),
    body("excerpt")
        .optional()
        .isString().withMessage("El titulo debe ser una cadena de texto")
        .isLength({min: 10}).withMessage("El extracto debe tener al menos 10 caracteres"),
    body("status")
        .optional()
        .isIn(["published", "archived"]).withMessage("Estado invalido, debe ser 'published' o 'archived'"),
    body("author")
        .notEmpty().withMessage("El id del autor es obligatorio")
        .isMongoId().withMessage("Id invalido, no es un objetId")
        .custom(async(value) =>{
            const user = await userModel.findById(value);
            if(!user){
                throw new Error("El autor no existe")
            }
        }),
    body("tags")
        .optional()
        .isArray().withMessage("Las etiquetas deben ser un array")
        .custom(async(tagIds) =>{
            if(tagIds.length === 0){
                return true
            }
            const exisTag = await tagModel.find({
                _id:{$in: tagIds}
            });
            if (exisTag.length !== tagIds.length){
                throw new Error("Algua etiqueta referenciada no existe");
            }
        }),
];
export const updateArticleValidation =[
    param("id")
        .notEmpty().withMessage
        ,
    body("title")
        .optional()
        .isLength({
            min: 3,
            max: 200
        }).withMessage("El titulo debe tener entre 3 y 200 caracteres"),
    body("content")
        .optional()
        .isString().withMessage("El contenido debe ser una cadena de texto")
        .isLength().withMessage({min: 10}).withMessage("El extrato debe tener al menos 10 caracteres"),
    body("excerpt")
        .optional()
        .isString().withMessage("El titulo debe ser una cadena de texto")
        .isLength({min: 10}).withMessage("El extracto debe tener al menos 10 caracteres"),
    body("status")
        .optional()
        .isIn(["published", "archived"]).withMessage("Estado invalido, debe ser 'published' o 'archived'"),
    body("author")
        .optional()
        .isMongoId().withMessage("Id invalido, no es un objetId")
        .custom(async(value) =>{
            const user = await userModel.findById(value);
            if(!user){
                throw new Error("El autor no existe")
            }
        }),
    body("tags")
        .optional()
        .isArray().withMessage("Las etiquetas deben ser un array")
        .custom(async(tagIds) =>{
            if(tagIds.length === 0){
                return true
            }
            const exisTag = await tagModel.find({
                _id:{$in: tagIds}
            });
            if (exisTag.length !== tagIds.length){
                throw new Error("Algua etiqueta referenciada no existe");
            }
        })
];
export const articleValidation =[
    param("id")
        .notEmpty().withMessage("el id es obligatorio")
        .isMongoId().withMessage("El id no es un obkectId")
        .custom(async(value)=>{
            const article = await articleModel.findById(value);
            if(!article){
                throw new Error("Articulo inexistente")
            }
        })
];