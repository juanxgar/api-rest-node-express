const { handleHttpError } = require("../utils/handleError");
const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");
const getProperties = require("../utils/handlePropertiesEngine");
const propertiesKey = getProperties();
/**
 * Permitir que solo los que se han logueado
 * puedan acceder a las rutas de tracks o storage
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "No_token", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();

    //Esto retorna el id y el role del usuario
    const dataToken = await verifyToken(token);

    if (!dataToken) {
      handleHttpError(res, "No_payload_data", 401);
      return;
    }

    /**
     * if (!dataToken[propertiesKey.id]) {
      handleHttpError(res, "Error_id_token", 401);
    }*/

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id]
    }






    //Esto no cambia la response pero si se puede saber
    //Desde el controlador de la ruta que esté usando el
    //middleware los valores de user
    //Aqui se cambio el metodo de findById a findOne porque
    //tanto mongo como sequelize lo comparten
    const user = await userModel.findOne(query);
    req.user = user;

    next();
  } catch (e) {
    handleHttpError(res, "Error_session", 401);
  }
};

module.exports = authMiddleware;
