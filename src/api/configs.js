import axios from "axios";

const authAPI = axios.create({
    baseURL: 'https://localhost:7433/api/Authorization'
});

export default authAPI;