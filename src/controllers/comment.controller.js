import { commentModel } from "../models//comment.model.js";

export const createComment = async (req, res) => {
  try {
  } catch (error) {
    //console.log(error)
    res.status(501).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
export const allComents = async (req, res) => {
  try {
  } catch (error) {
    //console.log(error)
    res.status(501).json({
      ok: false,
      msg: "Error interno en el servidor",
    });
  }
};
export const getComment = async (req, res) => {
  try {
  } catch (error) {}
};
export const updateComment = async (req, res) => {
  try {
    const { content, author, article } = req.body;
    const update = await commentModel.findByIdAndUpdate(
      req.params.id,
      { content },
      { new: true }
    );
    return res.status(200).json({
      ok: true,
      msg: "Comentario actualizada!",
      data: update,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      ok: false,
      msg: "Error al actualizar",
    });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const comment = await commentModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      ok: true,
      msg: "Comentario eliminado!",
    });
  } catch (error) {
    //console.log(error)
    res.status(501).json({
      ok: false,
      msg: "Error al eliminar el comentario",
    });
  }
};
