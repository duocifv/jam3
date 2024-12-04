// models/user.model.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config.js'); 

exports.User = sequelize.define('User', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_login: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_pass: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_nicename: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  display_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '', 
  },
}, {
  tableName: 'wp_users',
  timestamps: false,
});


