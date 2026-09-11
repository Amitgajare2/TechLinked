import axios from "axios";


export const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // send httpOnly refresh token cookie
});

let isRefreshing = false;
let pendingQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function flushQueue(token: string | null, error: unknown = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (token) resolve(token);
    else reject(error);
  });
  pendingQueue = [];
}

// Response interceptor auto-refresh on 401 
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Only attempt refresh once per request
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    // Skip refresh on the refresh endpoint itself to avoid loops
    if (original.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until the refresh completes
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (token) => {
            original.headers["Authorization"] = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      const { data } = await api.post("/auth/refresh");
      const newToken: string = data.data.accessToken;

      // Persist the new token
      localStorage.setItem("login", newToken);

      // Update default header for future requests
      api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      original.headers["Authorization"] = `Bearer ${newToken}`;

      flushQueue(newToken);
      return api(original);
    } catch (refreshError) {
      flushQueue(null, refreshError);
      localStorage.removeItem("login");
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// ── Request interceptor: attach token from localStorage ──────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("login");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
