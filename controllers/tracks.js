const { tracksModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");

/**
 * Obtener lista de la bd
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    //Obtener el user se obtiene gracias al middleware que usa
    //authmiddleware
    const user = req.user;
    //este es para mongo
    //const data = await tracksModel.find({});

    //este para sqls
    const data = await tracksModel.findAll({});
    res.send({ data, user });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error_get_items");
  }
};

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;

    //linea para mongo
    const data = await tracksModel.findById(id);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error_get_item");
  }
};

/**
 * Crear un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    //MatchedData solo toma en cuenta los datos de los validadores
    //de express-validator
    const body = matchedData(req);
    const data = await tracksModel.create(body);
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error_create_items");
  }
};

/**
 * Actualizar un registro
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await tracksModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error_update_items");
  }
};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    //Borrado real
    //const data = await tracksModel.deleteOne({_id:id});

    //Borrado lógico usando mongoose-delete
    const data = await tracksModel.delete({ _id: id });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error_delete_item");
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
