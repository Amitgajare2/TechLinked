import { apiRequest } from "@/src/lib/api"

//  Register 

export interface RegisterPayload {
  FirstName: string
  LastName: string
  email: string
  phone: string
  password: string
}

export interface RegisterResponse {
  success: boolean
  message: string
  user: {
    id: string
    FirstName: string
    LastName: string
    email: string
    phone: string
    phoneVerified: boolean
  }
}

export function register(payload: RegisterPayload) {
  return apiRequest<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: payload,
  })
}

// Send OTP 

export interface SendOtpResponse {
  success: boolean
  message: string
}

export function sendOtp(phone: string) {
  return apiRequest<SendOtpResponse>("/api/auth/send-otp", {
    method: "POST",
    body: { phone },
  })
}

// Verify OTP

export interface VerifyOtpResponse {
  success: boolean
  message: string
}

export function verifyOtp(phone: string, otp: string) {
  return apiRequest<VerifyOtpResponse>("/api/auth/verify-otp", {
    method: "POST",
    body: { phone, otp },
  })
}

//  Login 

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    user: {
      id: string
      firstName: string
      lastName: string
      phone: string
      email: string
    }
    accessToken: string
  }
}

export function login(payload: LoginPayload) {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: payload,
  })
}

// Logout 

export interface LogoutResponse {
  success: boolean
  message: string
}

export function logout() {
  return apiRequest<LogoutResponse>("/api/auth/logout", {
    method: "POST",
  })
}

// Refresh 

export interface RefreshResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
  }
}

export function refreshAccessToken() {
  return apiRequest<RefreshResponse>("/api/auth/refresh", {
    method: "POST",
  })
}
