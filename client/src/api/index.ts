import axios, { AxiosInstance } from "axios";

export const API_URL: string = `http://localhost:5000/api`;

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    post: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
  },
});

api.interceptors.request.use((config) => {
  config.headers.Accept = "application/json";
  config.headers["Content-Type"] = "application/json;charset=utf-8";
  config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  return config;
});

export default api;
