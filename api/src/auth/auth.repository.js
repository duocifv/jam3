const axios = require("axios");
const { User } = require("../models/user.model");
const { Op } = require('sequelize');

exports.findByUsername = async (username) => {
  try {
    const user = await User.findOne({
      where: { user_login: username },
    });
    return user?.dataValues;
  } catch (error) {
    throw new Error("Không thể xác thực người dùng.");
  }
};

exports.findByUserAndEmail = async (body) => {
  const { user_login, user_email } = body;
 
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ user_login }, { user_email }],
      },
    });
    return user;
  } catch (error) {
    throw new Error("Không thể đăng ký người dùng.");
  }
};

exports.createUser = async (body) => {
  const { user_login, user_email, hashedPassword } = body;
 
  try {
    const newUser = await User.create({
      user_login,
      user_email,
      user_pass: hashedPassword,
    });
    console.log("newUser", body)
    return newUser;
    
  } catch (error) {
    throw new Error("Không thể đăng ký người dùng.");
  }
};



// Đặt lại mật khẩu
exports.updatePassword = (email, newPassword) => {
  const user = users.find((user) => user.email === email);
  if (user) {
    user.password = newPassword;
  }
  return user;
};

const users = [
  {
    id: 1,
    username: "user1",
    password: "$2b$12$THVzL9wDJbLCVPRDxs2ff.HZmnUrmRpuKA4P6yqCD7ou2hKZCMxxG",
  },
];

exports.getUserByUsername = (username) => {
  return users.find((user) => user.username === username);
};
