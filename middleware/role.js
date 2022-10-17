const { handleHttpError } = require("../utils/handleError");

/**
 * Arreglo con roles permitidos
 * @param {*} role
 * @returns
 */
const checkRole = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;

    //Retorna un bool si hay un tipo de role dentro del
    //usuario y el middleware qu se envía desde la ruta
    const checkValueRole = roles.some((roleSingle) =>
      rolesByUser.includes(roleSingle)
    );

    if (!checkValueRole) {
      handleHttpError(res, "Not permissions", 403);
      return;
    }

    next();
  } catch (e) {
    handleHttpError(res, "Error_permissions", 403);
  }
};

module.exports = checkRole;
