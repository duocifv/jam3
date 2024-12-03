const { User } = require("../models/user.model");
const { Op } = require("sequelize");

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
  try {
    const newUser = await User.create({
      ...body,
      user_pass: hashedPassword,
    });
    console.log("newUser", body);
    return newUser;
  } catch (error) {
    throw new Error("Không thể đăng ký người dùng.");
  }
};

exports.findByEmail = async (user_email) => {
  try {
    const user = await User.findOne({ where: { user_email } });
    return user;
  } catch (error) {
    throw new Error("Không thể kiểm tra Email");
  }
};

exports.findByUserKey = async (decoded) => {
  try {
    const user = await User.findByPk(decoded.userId);
    return user;
  } catch (error) {
    throw new Error("Không thể kiểm tra Email");
  }
};
