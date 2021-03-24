import axios from 'axios';

const api_endpoint = "http://localhost:5000";


export default axios.create({
  baseURL: api_endpoint,
  responseType: "json",
  headers:{},
});
