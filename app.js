require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const openApiConfigration = require("./docs/swagger");
const app = express();
const dbConnectNoSql = require("./config/mongo");
const { dbConnectionPostgres } = require("./config/postgresql");

const ENGINE_DB = process.env.ENGINE_DB;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(cors());
app.use(express.json());

//Para poder obtener los archivos. Esto quiere decir que
//se le pide a Node que lea los archivos públicos desde esa carpeta
app.use(express.static("storage"));

const port = process.env.PORT || 3000;

/**
 * Definir rutas de documentacion
 */
app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(openApiConfigration)
);

/**
 * Rutas definidas aquí
 */
app.use("/api", require("./routes"));

if (NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log("Listen on http://localhost:" + port);
  });
}

ENGINE_DB === "nosql" ? dbConnectNoSql() : dbConnectionPostgres();

module.exports = app;
