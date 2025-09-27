import { userModel } from "../models/user.model.js"

export const ownerOrAdmin =(model) =>
    {return async(req, res, next)=>{
        try {
            const user = req.userLog;
            const {id} = req.params.id;
            //es para pasar directo a lo siguiente y no dar tantas vueltas
            //con validaciones
            if(user.role === "admin"){
                return next();
            }
            const resource = await model.findOne({
                _id: id,
                author: user.id
            });
            if(!resource){
                return res.status(403).json({
                    msg: "Permisos denegados"
                });
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: "Error interno en el servidor"
            });
        };
    };
};