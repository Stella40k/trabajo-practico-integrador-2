import { commentModel } from "../models//comment.model.js";
import { articleModel } from "../models/article.model.js";

export const createComment = async (req, res) => {
  try {
    const {content, author, article} = req.body;
    const comment = await commentModel.create({ content, author, article });
    return res.status(201).json({
      msg: "Comentario publicado",
      data: comment,
    });
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
    const comment = await commentModel.find().populate([
      {
        path: "author",
        select: "-password",
      },
      {
        path: "article",
        populate: {
          path: "author",
          model: "User",
          select: "-password",
        },
      },
    ]);
    return res.status(200).json({
      msg: "Todos los comentarios:",
      data: comment,
    });
  } catch (error) {
    //console.log(error)
    res.status(501).json({
      ok: false,
      msg: "Error interno en el servidor",
    });
  }
};
export const updateComment = async (req, res) => {
  try {
    const { content} = req.body;
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
      data: comment
    });
  } catch (error) {
    //console.log(error)
    res.status(501).json({
      ok: false,
      msg: "Error al eliminar el comentario",
    });
  }
};
export const getCommentsByArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const article = await articleModel.findById(articleId)
      .populate("author", "username profile.firstName profile.lastName")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username profile.firstName profile.lastName",
        },
      });
    return res.status(200).json({
      msg: "Comentarios del artículo:",
      data: article,
    });
  } catch (error) {
    //console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};
export const getUserLogComments = async (req, res) => {
  const user = req.userLog;
  try {
    const comment = await commentModel.find({ author: user.id });
    return res.status(200).json({
      msg: "Comentarios del usuario:",
      data: comment,
    });
  } catch (error) {
    //console.log(error);
    return res.status(501).json({
      msg: "Error interno del servidor",
    });
  }
};