import {tagModel} from "../models/tag.model.js";

export const createTag = async(req, res)=>{
    try {
        const{name, description}= req.body
        const newTag = await tagModel.create({
            name,
            description
        });
        return res.status(201).json({
            ok: true,
            msg: "Etiqueta creada",
            data: newTag
        });
    } catch (error) {
        //console.log(error)
        res.status(501).json({
            ok: false,
            msg: "Error al crear la etiqueta"
        })
    }
};
export const allTags = async(req, res)=>{
    try {
        const tags = await tagModel.find();
        return res.status(200).json({
            ok: true,
            data: tags
        });
    } catch (error) {
        //console.log(error)
        res.status(501).json({
            ok: false,
            msg: "Error interno en el servidor"
        });
    }
};
export const TagById = async(req, res)=>{
    try {
        const tag = await tagModel.findById(re.params.id);
        return res.status(200).json({
            ok: true,
            data: tag
        });
    } catch (error) {
        //console.log(error)
        res.status(501).json({
            ok: false,
            msg: "Error al buscar la etiqueta"
        });
    }
};
export const updateTag = async(req, res)=>{
    try {

        const{name, description}=req.body;
        const update = await tagModel.findByIdAndUpdate(
        req.params.id,
        {name, description},
        {new: true}
        );

        // validacion si no existe el tag con el updateTag
        return res.status(200).json({
            ok: true,
            msg: "Etiqueta actualizada!",
            data: update
            });
    } catch (error) {
        console.log(error)
        res.status(501).json({
            ok: false,
            msg: "Error al actualizar"
        });
    }
};
export const deleteTag = async(req, res)=>{
    try {
        const tag = await tagModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            ok: true,
            msg: "Etiqueta eliminada!"
        });
    } catch (error) {
        //console.log(error)
        res.status(501).json({
            ok: false,
            msg: "Error al eliminar la etiqueta"
        });
    }
};