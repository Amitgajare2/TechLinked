const ACCESS_TOKEN_KEY = "accessToken";

export const tokenStore = {
  get(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  set(token: string | null) {
    if (typeof window === "undefined") {
      return;
    }

    if (token) {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  },

  clear() {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};