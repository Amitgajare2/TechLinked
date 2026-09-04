"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, registerSchema } from "@/src/schemas"
import type { LoginFormData, RegisterFormData } from "@/src/schemas"

export default function Page() {
  const [isRegister, setIsRegister] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  // LOGIN 
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onLogin = (data: LoginFormData) => {
    console.log("Login data:", data)
  }

  // REGISTE
  const {
    register: registerField,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onRegister = (data: RegisterFormData) => {
    console.log("Register data:", data)
    // Registration details are valid, so show the OTP verification step.
    setShowOtp(true)
    setOtp(["", "", "", "", "", ""])
  }

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)
    const nextOtp = [...otp]
    nextOtp[index] = digit
    setOtp(nextOtp)

    if (digit && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pasted) return
    const nextOtp = pasted.split("").concat(["", "", "", "", "", ""]).slice(0, 6)
    setOtp(nextOtp)
    document.getElementById(`otp-${Math.min(pasted.length, 6) - 1}`)?.focus()
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join("")
    if (code.length !== 6) return
    console.log("OTP verified:", code)
  }

  return (
    <>
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
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dolorum quis sequi accusamus non explicabo quo. Nulla fugiat
            quos repellendus eligendi eaque sequi porro, ipsum cupiditate
            dignissimos, quas dolorem et doloribus?
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-full h-auto flex flex-col bg-white px-3 py-2 lg:w-3/5 lg:h-full lg:py-2.5 lg:px-1">
          {!showOtp && (
            <div className="w-full flex flex-row justify-between items-center gap-2">
              <h2 className="text-[1.1rem] font-bold text-black lg:text-2xl"
                style={{ fontFamily: "var(--font-logo)" }}>Techlinkeed</h2>

              <div className="flex items-center gap-2">
                <p
                  className="text-gray-500 text-[0.7rem] lg:text-sm"
                  style={{ fontFamily: "var(--font-body)" }}>
                  {isRegister
                    ? "Already have an account?"
                    : "Need an account?"}
                </p>

                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="border border-gray-500/20 text-black font-bold px-4 py-2 rounded-md hover:bg-gray-100 transition text-[0.6rem] lg:text-sm"
                  style={{ fontFamily: "var(--font-body)" }}>
                  {isRegister ? "Sign in" : "Register"}
                </button>

              </div>
            </div>
          )}

          {/* AUTH */}
          <div className="w-full h-full flex flex-col gap-2 mt-4 justify-center items-center">

            {!isRegister ? (

              /* login */
              <form
                onSubmit={handleLoginSubmit(onLogin)}
                className="w-full flex flex-col items-center"
              >
                <h3
                  className="lg:text-xl text-[1rem] font-bold text-black"
                  style={{ fontFamily: "var(--font-body)" }}>
                  Sign in to your account
                </h3>

                <p
                  className="text-gray-500 lg:text-sm text-[0.6rem] text-center"
                  style={{ fontFamily: "var(--font-body)" }}>
                  Enter your registered email and password to sign in to your
                  account
                </p>

                <div className="w-full max-w-md flex flex-col gap-1 mt-4">
                  {/* EMAIL */}
                  <input
                    {...loginRegister("email")}
                    type="email"
                    placeholder="Email address"
                    className={`border ${
                      loginErrors.email
                        ? "border-red-400"
                        : "border-gray-300"
                    } focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                    style={{ fontFamily: "var(--font-body)" }}/>

                  {loginErrors.email && (
                    <p className="text-red-500 text-xs px-1">
                      {loginErrors.email.message}
                    </p>
                  )}

                  {/* PASSWORD */}
                  <input
                    {...loginRegister("password")}
                    type="password"
                    placeholder="Enter password"
                    className={`border ${
                      loginErrors.password
                        ? "border-red-400"
                        : "border-gray-300"
                    } focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md mt-2 transition`}
                    style={{ fontFamily: "var(--font-body)" }}/>

                  {loginErrors.password && (
                    <p className="text-red-500 text-xs px-1">
                      {loginErrors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-black text-white font-bold text-sm px-4 py-2.5 rounded-md hover:bg-gray-800 transition mt-4 w-full max-w-md"
                  style={{ fontFamily: "var(--font-body)" }}>
                  Sign in with Email
                </button>
              </form>

            ) : (

              /* OTP */
              showOtp ? (
                <form
                  onSubmit={handleVerifyOtp}
                  className="w-full flex flex-col items-center">
                  <h3
                    className="lg:text-xl text-[1rem] font-bold text-black"
                    style={{ fontFamily: "var(--font-body)" }}>
                    Verify your account
                  </h3>

                  <p
                    className="text-gray-500 lg:text-sm text-[0.6rem] text-center mt-1"
                    style={{ fontFamily: "var(--font-body)" }}>
                    Enter the 6-digit OTP sent to your email</p>

                  <div className="flex items-center justify-center gap-2 mt-5">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        value={digit}
                        aria-label={`OTP digit ${index + 1}`}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={handleOtpPaste}
                        className="w-10 h-11 lg:w-12 lg:h-12 border border-gray-300 rounded-md text-center text-lg font-bold text-black focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition"
                        style={{ fontFamily: "var(--font-body)" }}/>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={otp.join("").length !== 6}
                    className="bg-black text-white font-bold text-sm px-4 py-2.5 rounded-md hover:bg-gray-800 transition mt-5 w-full max-w-md disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-body)" }}>
                    Verify OTP
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowOtp(false)}
                    className="text-gray-500 text-xs mt-3 hover:text-black transition"
                    style={{ fontFamily: "var(--font-body)" }}>
                    Back to registration
                  </button>
                </form>
              ) : (
              <form
                onSubmit={handleRegisterSubmit(onRegister)}
                className="w-full flex flex-col items-center">
                <h3
                  className="lg:text-xl text-[1rem] font-bold text-black"
                  style={{ fontFamily: "var(--font-body)" }}>
                  Create your account
                </h3>

                <p
                  className="text-gray-500 lg:text-sm text-[0.6rem] text-center"
                  style={{ fontFamily: "var(--font-body)" }}>
                  Create an account to get started with Techlinked
                </p>

                <div className="w-full max-w-md flex flex-col gap-1 mt-4">
                  {/* FIRST $ LAST NAME */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        {...registerField("firstName")}
                        type="text"
                        placeholder="First name"
                        className={`w-full border ${
                          registerErrors.firstName
                            ? "border-red-400"
                            : "border-gray-300"
                        } focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                        style={{ fontFamily: "var(--font-body)" }}/>

                      {registerErrors.firstName && (
                        <p className="text-red-500 text-xs px-1 mt-1">
                          {registerErrors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        {...registerField("lastName")}
                        type="text"
                        placeholder="Last name"
                        className={`w-full border ${
                          registerErrors.lastName
                            ? "border-red-400"
                            : "border-gray-300"
                        } focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                        style={{ fontFamily: "var(--font-body)" }}/>

                      {registerErrors.lastName && (
                        <p className="text-red-500 text-xs px-1 mt-1">
                          {registerErrors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* PHONE */}
                  <div className="mt-2">
                    <div
                      className={`flex items-center border ${
                        registerErrors.phone
                          ? "border-red-400"
                          : "border-gray-300"
                      } focus-within:ring-2 focus-within:ring-gray-500/15 rounded-md overflow-hidden transition`}>

                      <span
                        className="px-3 text-sm text-gray-500 border-r border-gray-200 bg-gray-50 py-2.5"
                        style={{ fontFamily: "var(--font-body)" }}>+91</span>

                      <input
                        {...registerField("phone")}
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="Mobile number"
                        className="w-full focus:outline-none text-sm py-2.5 px-3"
                        style={{ fontFamily: "var(--font-body)" }}
                        onInput={(e) => {
                          e.currentTarget.value =
                            e.currentTarget.value.replace(/\D/g, "")
                        }}/>
                    </div>

                    {registerErrors.phone && (
                      <p className="text-red-500 text-xs px-1 mt-1">
                        {registerErrors.phone.message}
                      </p>
                    )}

                  </div>

                  {/* EMAIL */}
                  <div className="mt-2">

                    <input
                      {...registerField("email")}
                      type="email"
                      placeholder="Email address"
                      className={`w-full border ${
                        registerErrors.email
                          ? "border-red-400"
                          : "border-gray-300"
                      } focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                      style={{ fontFamily: "var(--font-body)" }}/>

                    {registerErrors.email && (
                      <p className="text-red-500 text-xs px-1 mt-1">
                        {registerErrors.email.message}
                      </p>
                    )}

                  </div>

                  {/* PASS */}
                  <div className="mt-2">

                    <input
                      {...registerField("password")}
                      type="password"
                      placeholder="Create password"
                      className={`w-full border ${
                        registerErrors.password
                          ? "border-red-400"
                          : "border-gray-300"
                      } focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                      style={{ fontFamily: "var(--font-body)" }}/>

                    {registerErrors.password && (
                      <p className="text-red-500 text-xs px-1 mt-1">
                        {registerErrors.password.message}
                      </p>
                    )}

                  </div>

                  {/* CONFIRM PASS */}
                  <div className="mt-2">

                    <input
                      {...registerField("confirmPassword")}
                      type="password"
                      placeholder="Confirm password"
                      className={`w-full border ${
                        registerErrors.confirmPassword
                          ? "border-red-400"
                          : "border-gray-300"
                      } focus:outline-none text-sm focus:ring-2 focus:ring-gray-500/15 py-2.5 px-4 rounded-md transition`}
                      style={{ fontFamily: "var(--font-body)" }}/>

                    {registerErrors.confirmPassword && (
                      <p className="text-red-500 text-xs px-1 mt-1">
                        {registerErrors.confirmPassword.message}
                      </p>
                    )}

                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-black text-white font-bold text-sm px-4 py-2.5 rounded-md hover:bg-gray-800 transition mt-4 w-full max-w-md"
                  style={{ fontFamily: "var(--font-body)" }}>Create account</button>

                <p className="text-gray-400 text-[0.6rem] lg:text-xs text-center max-w-md mt-2"
                  style={{ fontFamily: "var(--font-body)" }}>
                  By creating an account, you agree to our terms and privacy
                  policy.
                </p>

              </form>
              )
            )}

          </div>
        </div>
      </div>
    </>
  )
}

