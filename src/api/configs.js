import axios from "axios";

const authAPI = axios.create({
    baseURL: 'https://skillforge.click/ic/Authorization'
});

export default authAPI;