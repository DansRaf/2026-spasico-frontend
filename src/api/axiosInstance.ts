import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5187/api', // Alamat backend ASP.NET kamu
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;