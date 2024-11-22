const {
  userLogin,
  userLogout,
  userRegister,
  forgotPassword,
  resetPassword,
} = require("./auth.service.js");
const errors = require('http-errors');

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await userLogin(username, password);
    console.log(user);
    if(!user) {
     return next(errors(400, 'Thông tin đăng nhập sai!'));
    }
    req.session.user = user;
    res.json({ message: "Đăng nhập thành công", user });
  } catch (error) {
   return next(errors(401, 'Bạn chưa đăng nhập!'));
  }
};

exports.profile = async (req, res) => {
  if (req.session.user) {
    res.json({ message: "Welcome!", user: req.session.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

exports.logout = async (req, res) => {
  try {
    await userLogout(req);
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};

exports.register = async (req, res, next) => {
  const { email, username, password, firstName, lastName } = req.body;
  try {
    const result = await userRegister( email, username, password, firstName, lastName);
    if(!result?.ok) {
      return next(errors(409, result.message));
    }else {
      return res.status(201).json(result);
    }
  } catch (error) {
    return next(errors(400, error.message || 'Đã có lỗi xảy ra'));
  }
};

// Yêu cầu quên mật khẩu
exports.forgot = (req, res) => {
  const { email } = req.body;
  try {
    const response = forgotPassword(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Đặt lại mật khẩu
exports.reset = (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    const user = resetPassword(email, token, newPassword);
    res.status(200).json({ message: "Password reset successful", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
