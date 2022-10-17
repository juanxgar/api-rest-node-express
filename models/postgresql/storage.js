const { sequelize } = require("../../config/postgresql");
const { DataTypes } = require("sequelize");

const Storage = sequelize.define(
  "storages",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Storage;
