import axios from 'axios';

const api_endpoint = process.env.REACT_APP_API_ENDPOINT || "http://localhost:5000";


export default axios.create({
  baseURL: api_endpoint,
  responseType: "json",
  headers:{},
});
