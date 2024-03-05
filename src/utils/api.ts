import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL: string = "https://api.themoviedb.org/3";
const API_TOKEN: string = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzJmZDRkNzhmNGM5MjdiMzYxMzI2NGQwZjU3NzhhMCIsInN1YiI6IjY1YmE4NzA5MzNhMzc2MDE3Yjg5MDA1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ARTT9vf6weqihckXBJdN20sJ2J7UP5-Mo8kYZFa77vQ`;

const headers: AxiosRequestConfig = {
    headers: {
        Authorization: "bearer " + API_TOKEN,
    }
}

export const fetchingDataFromApi = async<T>(url: string, params?: unknown): Promise<T> => {
    try {
        const response = await axios.get<T>(BASE_URL + url, { ...headers, params });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
