/* eslint-disable no-unused-vars */
import axios from "axios";


const client = axios.create({
    baseURL: "http://localhost:9000/api",
  });
  
  export default client;