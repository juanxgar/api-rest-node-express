const { matchedData } = require("express-validator");
const { tokenSign, verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");

/**
 * Este controlador registra un usuario
 * @param {*} req
 * @param {*} res
 */
const register = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await userModel.create(body);

    //Esta linea se usa para que no aparezca la contraseña en la respuesta
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: tokenSign(dataUser),
      user: dataUser,
    };

    res.status(201);
    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "Error_register_user");
  }
};

/**
 * Se encarga de loguear a una persona
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  try {
    //Curar la data con solo la info del modelo
    req = matchedData(req);

    //Como se habia puesto select false en el campo password
    // en el modelo, por eso se require del select
    //const user = await userModel
    //  .findOne({ email: req.email })
    //  .select("password name role email");

    //Esta linea es para sqls

    const user = await userModel.findOne({
      where: {
        email: req.email,
      },
    });

    if (!user) {
      handleHttpError(res, "Error_user_not_exists", 404);
      return;
    }

    //Como se hizo un set para definir que no aparezca el password
    //en la GET, por eso se usa el get
    const hashPassword = user.get("password");
    const checkPassword = await compare(req.password, hashPassword);

    if (!checkPassword) {
      handleHttpError(res, "Error_invalid_password", 401);
      return;
    }

    user.set("password", undefined, { strict: false });
    const data = {
      token: tokenSign(user),
      user,
    };

    res.send({ data });
  } catch (e) {
    handleHttpError(res, "Error_login_user");
  }
};

module.exports = { register, login };
