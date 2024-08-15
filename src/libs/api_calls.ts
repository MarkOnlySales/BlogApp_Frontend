import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios"


export const loginAPI = async (data: { username: string, password: string }) => {
    const response = await axios.post('/auth/login', {
        username: data.username,
        password: data.password
    });

    return response.data;
}
