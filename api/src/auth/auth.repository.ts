import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();

export const findByUsername = async (username: string) => {
  try {
    const data = await user.findFirst({
      where: { username },
    });
    return data;
  } catch (error) {
    throw new Error("Không thể xác thực người dùng.");
  }
};

export const findByUserAndEmail = async (body: {
  username: string;
  email: string;
}) => {
 
  const { username, email } = body;
  try {
    const data = await user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    return data;
  } catch (error) {
    throw new Error("Không thể đăng ký người dùng.");
  }
};

export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
  status: string;
}) => {
  try {
    return await user.create({
      data
    });
  } catch (error) {
    throw new Error("Không thể đăng ký người dùng.");
  }
};

export const findByEmail = async (email: string) => {
  try {
    const data = await user.findFirst({
      where: { email },
    });
    return data;
  } catch (error) {
    throw new Error("Không thể kiểm tra Email");
  }
};

export const changeUserPass = async (userId: number, password: string) => {
  try {
    const data = await user.update({
      where: { id: userId },
      data: { password },
    });
    return data;
  } catch (error) {
    throw new Error("Không thể cập nhật mật khẩu.");
  }
};

export const updatePassword = async (
  userId: number,
  hashedNewPassword: string
) => {
  return await user.update({
    where: { id: userId },
    data: { password: hashedNewPassword },
  });
};

export const findUserById = async (id: number) => {
  return await user.findUnique({
    where: { id },
  });
};
