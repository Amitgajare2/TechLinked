"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";
import { tokenStore } from "@/src/lib/auth/tokenStore"

import {
  login,
  logout,
  resendOtp,
  registerUser,
  sendOtp,
 verifyOtp
} from "@/src/API/Auth/authAPI";

interface JwtPayload {
  role: "admin" | "resident" | "superadmin";
  exp?: number;
  iat?: number;
}

interface ErrorResponse {
  message?: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      toast.success(data.message || "Registration successful");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data?.message || "Something went wrong";

      toast.error(message);
    },
  });
};


export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      const { accessToken: token } = data.data;
      console.log("token", token)

      tokenStore.set(token);

      // Decode token
      const decoded = jwtDecode<JwtPayload>(token);

      // Redirect based on role
      if (decoded.role === "admin") {
        router.push("/admin");
      } else if (decoded.role === "resident") {
        router.push("/resident");
      } else if (decoded.role === "superadmin") {
        router.push("/superadmin");
      } else {
        router.push("/");
      }

      // Refresh current user data
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      toast.success("Login successful");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data?.message || "Something went wrong";

      toast.error(message);
    },
  });
};


export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,

    onSuccess: () => {
      toast.success("Verification code sent");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data?.message || "Something went wrong";

      toast.error(message);
    },
  });
};


export const useVerifyOtp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyOtp,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      toast.success("Number verified");

      setTimeout(() => {
        router.push("/login");
      }, 500);
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      const message =
        error.response?.data?.message || "Something went wrong";

      toast.error(message);
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,

    onSuccess: () => {
      toast.success("A new code has been sent");
    },

    onError: () => {
      toast.error("Couldn't resend the code. Please try again.");
    },
  });
};


export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      tokenStore.set(null);

      // Refresh current user data
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      toast.success("Logged out successfully");

      setTimeout(() => {
        router.push("/");
      }, 500);
    },

    onError: () => {
      toast.error("Error logging out. Please try again.");
    },
  });
};