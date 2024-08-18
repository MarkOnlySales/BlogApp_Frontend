import axios from "./axios"

type LoginData = {
    username: string;
    password: string;
};

export const loginAPI = async (data: LoginData) => {
    const response = await axios.post('/auth/login', {
        username: data.username,
        password: data.password
    });

    return response.data;
}


type RegisterData = {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
};


export const registerAPI = async (data: RegisterData) => {
    const response = await axios.post('/auth/register', data);
    return response.data;
};