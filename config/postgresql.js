const { Sequelize } = require("sequelize");
const NODE_ENV = process.env.NODE_ENV;
const databaseUrl = (NODE_ENV === "test") ? process.env.POSTGRES_URL_TEST : process.env.POSTGRES_URL ;


const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
});

const dbConnectionPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("Correct conection");
  } catch (e) {
    console.log("Connection error ", e);
  }
};

module.exports = { sequelize, dbConnectionPostgres };
