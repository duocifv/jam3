
import { loginApi } from "./auth.api"
import { authStore } from "./auth.store"
import { ILogin } from "./auth.types"

// Hàm xử Service (login)
export const loginService = async (field: ILogin) => {
    const { user } = await loginApi(field)
    if (user) {
        authStore.setState({ user });
    }
    return user
}