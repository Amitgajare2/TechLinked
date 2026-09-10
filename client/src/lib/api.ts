import { getAccessToken } from "@/src/lib/token"

interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: object | null
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options

  const token = getAccessToken()

  const res = await fetch(endpoint, {
    credentials: "include", // send httpOnly refresh token cookie
    headers: {
      "Content-Type": "application/json",
      // Attach access token from memory — never from localStorage
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers as Record<string, string>),
    },
    body: body != null ? JSON.stringify(body) : undefined,
    ...rest,
  })

  const data = await res.json()

  if (!res.ok) {
    throw data
  }

  return data as T
}
