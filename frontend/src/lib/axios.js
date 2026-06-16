import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';

const api = axios.create({
  baseURL: isProd ? '/api' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'),
  withCredentials: true, // Important for cookies
});

export default api;
