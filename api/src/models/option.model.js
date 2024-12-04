// models/user.model.js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config.js");

exports.Option = sequelize.define(
  "Option",
  {
    option_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    option_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "wp_options",
    timestamps: false,
  }
);
