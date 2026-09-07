// Omit body from RequestInit so we can redefine it as a plain object
interface ApiOptions extends Omit<RequestInit, "body"> {
  body?: object | null
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { body, headers, ...rest } = options

  // Requests go to /api/* which Next.js proxies to the Express server.
  // Same-origin means no CORS, and cookies are included automatically.
  const res = await fetch(endpoint, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
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
