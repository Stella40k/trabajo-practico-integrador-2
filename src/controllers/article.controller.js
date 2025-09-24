import { articleModel } from "../models/article.model.js";

export const createArticle = async(req, res)=>{
    try {
        const{title, content, excerpt, author}= req.body
        const newArticle = await articleModel.create({
            title,
            content,
            excerpt,
            author
        });
        return res.status(201).json({
            ok: true,
            msg: "Articulo creado",
            data: newArticle
        });
    } catch (error) {
        //console.log(error)
        res.status(501).json({
            ok: false,
            msg: "Error interno"
        });
    }
};
export const allArticles = async(req, res)=>{
    try {
        const articles = await articleModel.find();
        return res.status(200).json({
            ok: true,
            data: articles
        });
    } catch (error) {
        //console.log(error)
        res.status(501).json({
            ok: false,
            msg: "Error interno"
        });
    }
};
export const articleByID = async(req, res)=>{
    try {
        const article = await articleModel.findById(req.params.id)
        return res.status(200).json({
            ok: true,
            data: article
        });
    } catch (error) {
        //console.log(error)
        res.status(501).json({
            ok: false,
            msg: "Error al buscar el articulo"
        });
    }
};
export const articleUpdate = async(req, res)=>{
    try {
        const{title, content, excerpt, author}= req.body;
        const article = await articleModel.findByIdAndUpdate(
            req.params.id,
            {title, content, excerpt}
        )
    } catch (error) {
        
    }
}