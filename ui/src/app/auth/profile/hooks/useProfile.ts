import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

// Hàm gọi API (login)
const queryFn = async () => {
    try {
        const res = await axios.get("http://localhost:3001/auth/profile",);
        return res.data;
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
}


export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn,
    })
}