import axios from 'axios';

const API = axios.create({
     baseURL:"http://localhost:5500/api/courses",
});

export default API;