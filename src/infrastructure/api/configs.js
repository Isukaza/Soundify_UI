import axios from "axios";
import {useStore} from "@/stores/index";

export const authAPI = axios.create({
    baseURL: 'https://localhost:2443/ic/Authorization'
});

export const cdnAPI = axios.create({
    baseURL: 'https://localhost:10433/Cdn',
})

export const trackAPI = axios.create({
    baseURL: 'https://localhost:2443/app/Track'
});

export const albumAPI = axios.create({
    baseURL: 'https://localhost:2443/app/Album'
})

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

albumAPI.interceptors.request.use((config) => {
    const jwt = useStore.getState().auth.jwt;
    if (jwt)
        config.headers.Authorization = `Bearer ${jwt}`;
    return config;
}, (error) => {
    return Promise.reject(error);
})