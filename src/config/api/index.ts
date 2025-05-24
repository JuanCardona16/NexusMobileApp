import axios from "axios";
import { API_URL } from "../enviroments";

console.log("Url de la api de render", API_URL);

const ApiInstance = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies for cross-site requests
});

// Interceptor para manejar errores globalmente
ApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default ApiInstance;
