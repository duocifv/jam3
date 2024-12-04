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

exports.changeUserPass = async (userId, hashedPassword) => {
  const user = await User.findByPk(userId);
    if(!user) return null
    user.user_pass = hashedPassword;
    await user.save();
    return user.dataValues || null;
};


exports.updatePassword = async (userId, hashedNewPassword) => {
  return await User.update(
    { user_pass: hashedNewPassword },
    { where: { ID: userId } }
  );
};

exports.findUserById = async (id) => {
  return await User.findByPk(id);
};