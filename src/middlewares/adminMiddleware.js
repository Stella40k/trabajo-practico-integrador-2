export const authAdmin = (req, res, next) =>{
    try {
        const user = req.user;
        if(!user){
            return res.status(401).json({
                ok: false,
                msg: "Permisos no autorizados"
            });
        }
        if(user.role !== "admin"){
            return res.status(403).json({
                ok: false,
                msg: "Acesso denegado, solo administradores"
            });
        }
        next();
    } catch (error) {
        console.log("Error moddlewareAdmin",error)
        res.status(500).json({
            ok:false,
            msg: "Error en la verficacion de roles"
        });
    }
}