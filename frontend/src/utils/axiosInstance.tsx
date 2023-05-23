import axios from 'axios'
import Cookies from 'js-cookie'

const token = Cookies.get('IMA_token')

const axiosInstance = axios.create({
    withCredentials: true, 
    baseURL: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }
});

export default axiosInstance