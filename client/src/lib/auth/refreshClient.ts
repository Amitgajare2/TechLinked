import axios from "axios";

// Separate instance: no interceptors, avoids recursive refresh loops entirely.
export const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export interface RefreshResponse {
  data: { accessToken: string };
}

export async function refreshAccessToken(): Promise<string> {
  const { data } = await refreshClient.post<RefreshResponse>("/auth/refresh");
  const token = data?.data?.accessToken;

  if (!token) {
    throw new Error("Refresh response missing accessToken");
  }

  return token;
}