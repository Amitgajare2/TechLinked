type TokenListener = (token: string | null) => void;

let accessToken: string | null = null;
const listeners = new Set<TokenListener>();

export const tokenStore = {
  get(): string | null {
    return accessToken;
  },

  set(token: string | null) {
    accessToken = token;
    listeners.forEach((listener) => listener(token));
  },

  subscribe(listener: TokenListener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};