import axios from "axios";
import { attachAuthInterceptors } from "../../src/lib/api/interceptors";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // sends the httpOnly refresh-token cookie
});

attachAuthInterceptors(api);