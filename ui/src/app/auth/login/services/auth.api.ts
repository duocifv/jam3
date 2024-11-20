import axios from "axios";
import { ILogin } from "./auth.types";

// Hàm gọi API (login)
export const loginApi = async ({ username, password }: ILogin) => {
    try {
        const res = await axios.post("http://localhost:3001/auth/login", {
            username,
            password
        }, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
}
