import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { tokenStore } from "../auth/tokenStore";
import { coordinateRefresh } from "../auth/refreshCoordinator";

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const AUTH_EXEMPT_PATHS = ["/auth/refresh", "/auth/login", "/auth/register"];

function isAuthExemptRequest(config?: RetryableConfig): boolean {
  return AUTH_EXEMPT_PATHS.some((path) => config?.url?.includes(path));
}

// interceptors.ts
function onAuthFailure() {
  const hadSession = tokenStore.get() !== null; // token existed before this failure
  tokenStore.set(null);

  if (hadSession) {
    const redirectTarget = encodeURIComponent(window.location.pathname);
    window.location.href = `/login?redirect=${redirectTarget}`;
  }
  // if there was no session to begin with, do nothing — let the page render as a guest
}

export function attachAuthInterceptors(client: AxiosInstance) {
  client.interceptors.request.use((config) => {
    const token = tokenStore.get();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original = error.config as RetryableConfig | undefined;

      const shouldAttemptRefresh =
        error.response?.status === 401 &&
        original &&
        !original._retry &&
        !isAuthExemptRequest(original);

      if (!shouldAttemptRefresh) {
        return Promise.reject(error);
      }

      original._retry = true;

      try {
        const token = await coordinateRefresh();
        original.headers["Authorization"] = `Bearer ${token}`;
        return client(original);
      } catch (refreshError) {
        onAuthFailure();
        return Promise.reject(refreshError);
      }
    }
  );
}