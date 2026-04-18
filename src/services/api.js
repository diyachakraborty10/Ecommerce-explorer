import axios from "axios";

const API = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const getProducts = () => API.get("/products");
export const getCategories = () => API.get("/products/categories");
export const getProductsByCategory = (cat) =>
  API.get(`/products/category/${cat}`);
export const getProductById = (id) =>
  API.get(`/products/${id}`);