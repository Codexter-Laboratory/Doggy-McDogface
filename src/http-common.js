import axios from 'axios';

const http = axios.create({
  baseURL: 'https://dog.ceo/api',
});

export default http;
