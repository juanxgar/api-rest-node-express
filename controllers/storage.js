const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const fs = require("fs");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de la bd
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    //para no sql
    //const data = await storageModel.find({});

    //para sql
    const data = await storageModel.findAll({});
    res.send({ data });
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
    const { id } = matchedData(req);
    //para nosql
    //const data = await storageModel.findById(id);

    //para sql
    const data = await storageModel.findOne({
      where: {
        id,
      },
    });
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
    const { body, file } = req;
    console.log(file);
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.status(201);
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error_get_item");
  }
};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);

    //para nosql
    //const datafile = await storageModel.findById(id);

    //para sql
    const datafile = await storageModel.findOne({
      where: {
        id,
      },
    });

    //Borrado lógico
    //se usa con no sql
    //await storageModel.delete({ _id: id });

    //esta es para sql
    await storageModel.destroy({
      where: { id },
    });
    const { filename } = datafile;
    const filePath = `${MEDIA_PATH}/${filename}`;
    //Esto elimina del File System el archivo en esa ruta
    //Esto hace la eliminacion real, por eso, si se quiere
    //hacer la eliminacion logica, se comenta
    //fs.unlinkSync(filePath);

    const data = {
      filePath,
      deleted: 1,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error_delete_item");
  }
};

module.exports = { getItems, getItem, createItem, deleteItem };
