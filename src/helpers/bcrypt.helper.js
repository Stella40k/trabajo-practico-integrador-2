import bcrypt from "bcrypt";

export const hashPassword = (password) =>{
    try {
        return bcrypt.hash(password, 5);
    } catch (error) {
        console.log("error al hashear la contraseña", error);
        throw new Error("Error con la contraseña: no se pudo hashear la contraseña")
    };
};
export const comparePasswords = (password, hashPassword)=>{
    try {
        return bcrypt.compare(password, hashPassword)
    } catch (error) {
        console.log("error al comparar las contraseñas", error);
        throw new Error("Error al autenticar la contraseña")
    };
};