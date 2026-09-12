import { refreshAccessToken } from "./refreshClient";
import { tokenStore } from "./tokenStore";

let inFlight: Promise<string> | null = null;

export function coordinateRefresh(): Promise<string> {
  if (!inFlight) {
    inFlight = refreshAccessToken()
      .then((token) => {
        tokenStore.set(token);
        return token;
      })
      .catch((err) => {
        tokenStore.set(null);
        throw err;
      })
      .finally(() => {
        inFlight = null;
      });
  }
  return inFlight;
}