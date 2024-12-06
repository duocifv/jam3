export interface AuthLogin {
  username?: string
  password?: string
}

export interface AuthRegister {
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthForgot {
  user_email: string
}
