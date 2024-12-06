// models/user.model.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config.js");

exports.Profiles = sequelize.define(
  "Profile",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    tableName: "profiles",
    timestamps: false,
  }
);
