import axios from "axios";

export const httpClient = axios.create({
  baseURL: import.meta.env.BACKEND_GATEWAY,
});
