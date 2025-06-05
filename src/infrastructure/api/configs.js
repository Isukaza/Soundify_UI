import axios from "axios";
import {useStore} from "@/stores/index";

export const authAPI = axios.create({
    baseURL: 'https://localhost:7433/Authorization'
});

export const cdnAPI = axios.create({
    baseURL: 'https://localhost:10433/Cdn',
})

export const trackAPI = axios.create({
    baseURL: 'https://localhost:8433/api/Track'
});

cdnAPI.interceptors.request.use((config) => {
    const jwt = useStore.getState().auth.jwt;
    if (jwt)
        config.headers.Authorization = `Bearer ${jwt}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

trackAPI.interceptors.request.use((config) => {
    const jwt = useStore.getState().auth.jwt;
    if (jwt)
        config.headers.Authorization = `Bearer ${jwt}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});