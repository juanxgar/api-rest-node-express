const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

/**Aquí no se requiere porque se está haciendo
 * uso de muller para el manejo de archivos
 * 
 * const validatorCreateItem = [
  check("filename").exists().notEmpty().isLength({ min: 4, max: 100 }),
  check("url").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];*/

const validatorGetItem = [
  check("id").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorGetItem };
