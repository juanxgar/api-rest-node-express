const express = require("express");
//file system: viene con node
const fs = require("fs");
const router = express.Router();

/**
 * Es para no tener que estar guardando las rutas
 * en el app.js y que quede de manera dinámica
 * dirname retorna los nombres de los archivos de las rutas
 */
const PATH_ROUTES = __dirname;

/**
 * Como retorna el valor con la extensión, por eso
 * es necesario eliminarla
 */
const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    router.use(`/${name}`, require(`./${file}`));
  }
});

module.exports = router;
