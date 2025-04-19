import axios from "axios";
import {useAuthStore} from "@/stores/useAuthStore.js";

export const authAPI = axios.create({
    baseURL: 'https://localhost:7433/Authorization'
});

export const cdnAPI = axios.create({
    baseURL: 'https://localhost:10433/Cdn',
})

cdnAPI.interceptors.request.use((config) => {
    const jwt = useAuthStore.getState().jwt;
    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});