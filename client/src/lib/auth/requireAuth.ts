import { tokenStore } from "./tokenStore"

export class AuthRequiredError extends Error {
  constructor() {
    super("NOT_AUTHENTICATED")
    this.name = "AuthRequiredError"
  }
}

export function requireAuth() {
  if (!tokenStore.get()) {
    throw new AuthRequiredError()
  }
}