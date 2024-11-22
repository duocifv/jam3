const axios = require("axios");

exports.findByUsername = async (username, password) => {
  try {
    const response = await axios.post(
      "https://cms.duocnv.top/graphql",
      {
        query: `
        mutation LoginUser {
          loginUser(input: { username: "${username}", password: "${password}" }) {
            user {
              userId
              username
              email
            }
          }
        }
      `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // Kiểm tra xem mutation có trả về thông tin người dùng hay không
    if (response?.data?.data?.loginUser?.user) {
      return response.data.data.loginUser.user; // Trả về thông tin người dùng
    } else {
      return null; // Trường hợp thông tin đăng nhập không hợp lệ
    }
  } catch (error) {
    console.error("Lỗi khi gọi GraphQL API:", error);
    throw new Error("Không thể xác thực người dùng.");
  }
};

exports.RegisterUser = async (
  email,
  username,
  password,
  firstName,
  lastName
) => {
  try {
    const response = await axios.post(
      "https://cms.duocnv.top/graphql",
      {
        query: `
          mutation RegisterUser($email: String!, $username: String!, $password: String!, $firstName: String!, $lastName: String!) {
            registerUser(
              input: {
                email: $email
                username: $username
                password: $password
                firstName: $firstName
                lastName: $lastName
              }
            ) {
              user {
                email
              }
            }
          }
        `,
        variables: {
          email: email,
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(response?.data?.data?.registerUser?.user){
      return response.data.data.registerUser
    }
    if(response?.data?.errors) {
      return response.data.errors[0]
    }
    return response
  } catch (error) {
    console.error("Lỗi khi gọi GraphQL API:",error);
    return error
  }
};

// Lưu người dùng mới
exports.addUser = (username, password) => {
  const newUser = {
    id: users.length + 1, // Tạo ID tự tăng
    username,
    password,
  };
  users.push(newUser);
  return newUser;
};

// Tìm người dùng theo email
exports.findByEmail = (email) => {
  return users.find((user) => user.email === email);
};

// Đặt lại mật khẩu
exports.updatePassword = (email, newPassword) => {
  const user = users.find((user) => user.email === email);
  if (user) {
    user.password = newPassword;
  }
  return user;
};
