const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/postgresql");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.NUMBER,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(["user", "admin"]),
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
  }
);

User.find = User.findAll;
User.findById = User.findByPk;
module.exports = User;
