"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

import {
  login,
  logout,
//   registerUser,
} from "@/src/API/Auth/authAPI";

interface JwtPayload {
  role: "admin" | "resident" | "superadmin";
  exp?: number;
  iat?: number;
}

interface ErrorResponse {
  message?: string;
}

// ==================== REGISTER ====================

// export const useRegister = () => {
//   return useMutation({
//     mutationFn: registerUser,

//     onSuccess: () => {
//       toast.success("Admin registered successfully");
//     },

//     onError: (error: AxiosError<ErrorResponse>) => {
//       const message =
//         error.response?.data?.message || "Something went wrong";

//       toast.error(message);
//     },
//   });
// };

// ==================== LOGIN ====================

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      const token = data.access_token;

      // Store token
      localStorage.setItem("login", token);

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

// ==================== LOGOUT ====================

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      // Remove token
      localStorage.removeItem("login");

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