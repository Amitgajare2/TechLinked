const ACCESS_TOKEN_KEY = "accessToken";

export const tokenStore = {
  get(): string | null {
    if (typeof window === "undefined") {
      return null;
    }
    const directToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (directToken) {
      return directToken;
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (!key?.endsWith("-auth-token")) {
        continue;
      }

      const value = localStorage.getItem(key);

      if (!value) {
        continue;
      }

      try {
        const session = JSON.parse(value);

        if (session?.access_token) {
          return session.access_token;
        }
      } catch {
        continue;
      }
    }

    return null;
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