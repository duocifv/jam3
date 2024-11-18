const { userLogin, userLogout, userRegister, forgotPassword, resetPassword } = require("./auth.service.js");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userLogin(username, password);
    req.session.user = user;
    res.json({ message: "Login successful",user });
  } catch (error) {
    res.status(401).json({ message: error.message });
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

exports.register = (req, res) => {
  const { username, password } = req.body;

  try {
    const newUser = userRegister(username, password);
    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.status(200).json({ message: 'Password reset successful', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};