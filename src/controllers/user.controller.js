import { userModel } from "../models/user.model.js";

export const registerUser = async(req, res)=>{
    try {
        const {username, email, role, password, profile } = req.body

        const newUser = await userModel.create({
            username,
            email,
            password,
            role,
            profile
        })
        res.status(201).json({
            ok: true,
            msg:"Usuario creado",
            data: newUser
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Ocurrio un error en el servidor"
        });
    }
};
export const getAllUsers = async(req, res)=>{
    try {
        const users = await userModel.find().select('-password');
        return res.status(200).json({
            ok: true,
            msg: "Usuarios",
            data: users
        });
    } catch (error) {
        //console.log(error)
        res.status(501).json({
            ok: false,
            msg: "Error en el servidor"
        });
    }
};
export const getUser = async(req, res)=>{
    try {
        const user = await userModel.findById(req.params.id);
        return res.status(200).json({
            ok: true,
            msg: user
        });
    } catch (error) {
        //console.log(error)
        res.status(501).json({
            ok: false,
            msg: "Usuario no encontrado"
        });
    }
};
export const updateUser = async(req, res)=> {
 try {
    const {id} = req.params;
    const updateData = req.body;
        //preguntar mas de esto
    //defino los campos del perfil
    //const profileFields = ["firstName", "lasName", "biography", "avatarUrl", "birthDate"];
    
    // construyo la consulta actualizada
    //const updateQuery = {};

    const user = await userModel.findByIdAndUpdate(
        id,
        {$set: {profile: updateData}},
        {new: true}
    ).select('-password')
    //el problema q hay aca es q tendre q hacer un endpoint
    //no podre mezclar los campos, preguntar si afecta al actualizar
    return res.status(200).json({
        ok: true,
        msg: "Usuario actualizado",
        data: user
    })
    
 }catch (error) {
    //console.log(error)
    res.status(501).json({
        ok: false,
        msg: "Error al actualizar",
    })
 }
};
export const deleteUser = async(req, res)=>{
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        //agregar eliminacion logica para softdelete
        return res.status(200).json({
            ok: true,
            msg: "Usuario eliminado",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar el usuario"
        });
    }
};
