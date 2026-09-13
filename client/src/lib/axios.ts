import axios from "axios";
import { attachAuthInterceptors } from "../../src/lib/api/interceptors";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // sends the httpOnly refresh-token cookie
});

attachAuthInterceptors(api);