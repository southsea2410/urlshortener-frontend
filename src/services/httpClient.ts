import axios from "axios";

import { baseBackendUrl } from "./apis";

export const httpClient = axios.create({
  baseURL: baseBackendUrl,
});
