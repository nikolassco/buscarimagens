import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  timeout: 1000000,
  headers: { 'Content-Type': 'application/json' }
});

export default api;
