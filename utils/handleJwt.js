const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("./handlePropertiesEngine");
const propertiesKey = getProperties();
/**
 * Se debe de pasar el objeto del usuario (nombre, email, etc)
 * @param {*} user
 */
const tokenSign = (user) => {
  const sign = jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  return sign;
};

/**
 * Se pasa el token de sesion jwt
 * @param {*} tokenJwt
 */
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
