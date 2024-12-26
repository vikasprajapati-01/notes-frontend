import axios from "axios";

import { ACCESS_TOKEN } from "./constant";

const apiUrl = "https://notes-backend-ny32.onrender.com"

const api = axios.create({
    // baseURL: "http://127.0.0.1:8000/"
    baseURL:  import.meta.env.VITE_BASE_URL ? import.meta.env.VITE_BASE_URL : apiUrl
    // baseURL: process.env.VITE_BASE_URL
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api