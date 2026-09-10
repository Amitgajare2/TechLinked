"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/context/AuthContext"
import { useLoginForm } from "@/src/hooks/useLoginForm"
import { useRegisterForm } from "@/src/hooks/useRegisterForm"
import { useOtpForm } from "@/src/hooks/useOtpForm"

export default function Page() {
  const router = useRouter()
  const { user, initializing } = useAuth()

  const [isRegister, setIsRegister] = useState(false)
  const [registeredPhone, setRegisteredPhone] = useState("")
  const [showOtp, setShowOtp] = useState(false)

  // Redirect allready-authenticeted users
  useEffect(() => {
    if (!initializing && user) {
      router.replace("/home")
    }
  }, [user, initializing, router])

  // Hooks
  const loginForm = useLoginForm()

  // After login succeeds redirect to home page
  const registerForm = useRegisterForm({
    onOtpReady: (phone) => {
      setRegisteredPhone(phone)
      setShowOtp(true)
    },
  })

  const otpForm = useOtpForm({
    phone: registeredPhone,
    onVerified: () => {
      setShowOtp(false)
      setIsRegister(false)
      setRegisteredPhone("")
    },
  })

 
  const switchMode = () => {
    setIsRegister((v) => !v)
    setShowOtp(false)
    setRegisteredPhone("")
    otpForm.reset()
    loginForm.clearError()
    registerForm.clearError()
  }

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading…</p>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col gap-3 p-1.5 lg:h-screen lg:flex-row lg:items-center lg:gap-4 lg:p-1.5">

      {/* LEFT */}
      <div className="w-full rounded-[1.5rem] min-h-[380px] flex flex-col justify-center bg-gradient-to-b from-neutral-900 via-orange-600 to-orange-50 px-5 py-8 lg:w-3/6 lg:h-full lg:min-h-0 lg:rounded-lg lg:py-0">
        <h1
          className="text-[3rem] font-bold text-white leading-none"
          style={{ fontFamily: "var(--font-logo)" }}
        >
          Techlinkeed
        </h1>
        <p
          className="text-white text-sm mt-4 leading-relaxed max-w-lg"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Techlinkeed is a professional social platform where users can post,
          share, and build reputation while earning coins. These coins can
          unlock access to exclusive job interview rounds turning your activity
          and contribution into real career opportunities.
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-full h-auto flex flex-col bg-white px-3 py-2 lg:w-3/5 lg:h-full lg:py-2.5 lg:px-1">

        {/* Top bar — hidden on OTP screen */}
        {!showOtp && (
          <div className="w-full flex flex-row justify-between items-center gap-2">
            <h2
              className="text-[1.1rem] font-bold text-black lg:text-2xl"
              style={{ fontFamily: "var(--font-logo)" }}
            >
              Techlinkeed
            </h2>
            <div className="flex items-center gap-2">
              <p
                className="text-gray-500 text-[0.7rem] lg:text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {isRegister ? "Already have an account?" : "Need an account?"}
              </p>
              <button
                type="button"
                onClick={switchMode}
                className="border border-gray-500/20 text-black font-bold px-4 py-2 rounded-md hover:bg-gray-100 transition text-[0.6rem] lg:text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {isRegister ? "Sign in" : "Register"}
              </button>
            </div>
          </div>
        )}

        <div className="w-full h-full flex flex-col gap-2 mt-4 justify-center items-center">

          {/*  LOGIN */}
          {!isRegister && (
            <form onSubmit={loginForm.handleSubmit} className="w-full flex flex-col items-center">
              <h3
                className="lg:text-xl text-[1rem] font-bold text-black"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Sign in to your account
              </h3>
              <p
                className="text-gray-500 lg:text-sm text-[0.6rem] text-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Enter your registered email and password to sign in
              </p>

              {loginForm.error && (
                <p className="w-full max-w-md text-red-600 text-xs bg-red-50 border border-red-200 rounded-md px-3 py-2 mt-3"
                  style={{ fontFamily: "var(--font-body)" }}>
                  {loginForm.error}
                </p>
              )}

              <div className="w-full max-w-md flex flex-col gap-1 mt-4">
                <input
                  {...loginForm.register("email")}
                  type="email"
                  placeholder="Email address"
                  className={`border ${loginForm.errors.email ? "border-red-400" : "border-gray-300"} focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {loginForm.errors.email && (
                  <p className="text-red-500 text-xs px-1">{loginForm.errors.email.message}</p>
                )}

                <input
                  {...loginForm.register("password")}
                  type="password"
                  placeholder="Enter password"
                  className={`border ${loginForm.errors.password ? "border-red-400" : "border-gray-300"} focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md mt-2 transition`}
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {loginForm.errors.password && (
                  <p className="text-red-500 text-xs px-1">{loginForm.errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loginForm.loading}
                className="bg-black text-white font-bold text-sm px-4 py-2.5 rounded-md hover:bg-gray-800 transition mt-4 w-full max-w-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {loginForm.loading ? "Signing in…" : "Sign in with Email"}
              </button>
            </form>
          )}

          {/*  OTP  */}
          {isRegister && showOtp && registeredPhone && (
            <form onSubmit={otpForm.handleSubmit} className="w-full flex flex-col items-center">
              <h3
                className="lg:text-xl text-[1rem] font-bold text-black"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Verify your account
              </h3>
              <p
                className="text-gray-500 lg:text-sm text-[0.6rem] text-center mt-1"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Enter the 6-digit OTP sent to{" "}
                {registeredPhone.replace(/(\+\d{2})\d{6}(\d{4})/, "$1******$2")}
              </p>

              {otpForm.error && (
                <p className="w-full max-w-md text-red-600 text-xs bg-red-50 border border-red-200 rounded-md px-3 py-2 mt-3"
                  style={{ fontFamily: "var(--font-body)" }}>
                  {otpForm.error}
                </p>
              )}
              {otpForm.success && (
                <p className="w-full max-w-md text-green-700 text-xs bg-green-50 border border-green-200 rounded-md px-3 py-2 mt-3"
                  style={{ fontFamily: "var(--font-body)" }}>
                  {otpForm.success}
                </p>
              )}

              <div className="flex items-center justify-center gap-2 mt-5">
                {otpForm.digits.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    aria-label={`OTP digit ${index + 1}`}
                    onChange={(e) => otpForm.handleChange(index, e.target.value)}
                    onKeyDown={(e) => otpForm.handleKeyDown(index, e)}
                    onPaste={otpForm.handlePaste}
                    className="w-10 h-11 lg:w-12 lg:h-12 border border-gray-300 rounded-md text-center text-lg font-bold text-black focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={!otpForm.isComplete || otpForm.loading}
                className="bg-black text-white font-bold text-sm px-4 py-2.5 rounded-md hover:bg-gray-800 transition mt-5 w-full max-w-md disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {otpForm.loading ? "Verifying…" : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={otpForm.handleResend}
                disabled={otpForm.loading || otpForm.resendCooldown > 0}
                className="text-gray-500 text-xs mt-3 hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {otpForm.resendCooldown > 0
                  ? `Resend OTP (${otpForm.resendCooldown}s)`
                  : "Resend OTP"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOtp(false)
                  setRegisteredPhone("")
                  otpForm.reset()
                }}
                className="text-gray-400 text-xs mt-1.5 hover:text-black transition"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Back to registration
              </button>
            </form>
          )}

          {/* REGISTER  */}
          {isRegister && !showOtp && (
            <form onSubmit={registerForm.handleSubmit} className="w-full flex flex-col items-center">
              <h3
                className="lg:text-xl text-[1rem] font-bold text-black"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Create your account
              </h3>
              <p
                className="text-gray-500 lg:text-sm text-[0.6rem] text-center"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Create an account to get started with Techlinked
              </p>

              {registerForm.error && (
                <p className="w-full max-w-md text-red-600 text-xs bg-red-50 border border-red-200 rounded-md px-3 py-2 mt-3"
                  style={{ fontFamily: "var(--font-body)" }}>
                  {registerForm.error}
                </p>
              )}

              <div className="w-full max-w-md flex flex-col gap-1 mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      {...registerForm.field("firstName")}
                      type="text"
                      placeholder="First name"
                      className={`w-full border ${registerForm.errors.firstName ? "border-red-400" : "border-gray-300"} focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    {registerForm.errors.firstName && (
                      <p className="text-red-500 text-xs px-1 mt-1">{registerForm.errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...registerForm.field("lastName")}
                      type="text"
                      placeholder="Last name"
                      className={`w-full border ${registerForm.errors.lastName ? "border-red-400" : "border-gray-300"} focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                      style={{ fontFamily: "var(--font-body)" }}
                    />
                    {registerForm.errors.lastName && (
                      <p className="text-red-500 text-xs px-1 mt-1">{registerForm.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-2">
                  <div className={`flex items-center border ${registerForm.errors.phone ? "border-red-400" : "border-gray-300"} focus-within:ring-2 focus-within:ring-gray-500/15 rounded-md overflow-hidden transition`}>
                    <span className="px-3 text-sm text-gray-500 border-r border-gray-200 bg-gray-50 py-2.5"
                      style={{ fontFamily: "var(--font-body)" }}>+91</span>
                    <input
                      {...registerForm.field("phone")}
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="Mobile number"
                      className="w-full focus:outline-none text-sm py-2.5 px-3"
                      style={{ fontFamily: "var(--font-body)" }}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
                      }}
                    />
                  </div>
                  {registerForm.errors.phone && (
                    <p className="text-red-500 text-xs px-1 mt-1">{registerForm.errors.phone.message}</p>
                  )}
                </div>

                <div className="mt-2">
                  <input
                    {...registerForm.field("email")}
                    type="email"
                    placeholder="Email address"
                    className={`w-full border ${registerForm.errors.email ? "border-red-400" : "border-gray-300"} focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {registerForm.errors.email && (
                    <p className="text-red-500 text-xs px-1 mt-1">{registerForm.errors.email.message}</p>
                  )}
                </div>

                <div className="mt-2">
                  <input
                    {...registerForm.field("password")}
                    type="password"
                    placeholder="Create password"
                    className={`w-full border ${registerForm.errors.password ? "border-red-400" : "border-gray-300"} focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {registerForm.errors.password && (
                    <p className="text-red-500 text-xs px-1 mt-1">{registerForm.errors.password.message}</p>
                  )}
                </div>

                <div className="mt-2">
                  <input
                    {...registerForm.field("confirmPassword")}
                    type="password"
                    placeholder="Confirm password"
                    className={`w-full border ${registerForm.errors.confirmPassword ? "border-red-400" : "border-gray-300"} focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                  {registerForm.errors.confirmPassword && (
                    <p className="text-red-500 text-xs px-1 mt-1">{registerForm.errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={registerForm.loading}
                className="bg-black text-white font-bold text-sm px-4 py-2.5 rounded-md hover:bg-gray-800 transition mt-4 w-full max-w-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {registerForm.loading ? "Creating account…" : "Create account"}
              </button>

              <p
                className="text-gray-400 text-[0.6rem] lg:text-xs text-center max-w-md mt-2"
                style={{ fontFamily: "var(--font-body)" }}
              >
                By creating an account, you agree to our terms and privacy policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
