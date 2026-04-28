import axios from "axios";

export const api = axios.create({
  baseURL: "https://69f0aaf7c1533dbedc9d809d.mockapi.io/products",
});