import axios from 'axios';

const api = axios.create({
    baseURL: "https://backend-amigo-chocolate.herokuapp.com",
})

export default api;