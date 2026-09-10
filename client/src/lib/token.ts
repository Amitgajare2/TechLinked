/**
 * In-memory access token store.
 *
 * Keeps the access token out of localStorage (which is readable by any JS
 * on the page). The token lives only for the duration of the browser session.
 * On a hard refresh the user will silently re-authenticate via the httpOnly
 * refresh token cookie using the /api/auth/refresh endpoint.
 */

let _accessToken: string | null = null

export function setAccessToken(token: string) {
  _accessToken = token
}

export function getAccessToken(): string | null {
  return _accessToken
}

export function clearAccessToken() {
  _accessToken = null
}
