import { api } from "@/src/lib/axios";

export const registerUser = async (data: unknown) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: unknown) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const sendOtp = async (data: unknown) => {
  const res = await api.post("/auth/send-otp", data);
  return res.data;
};

export const verifyOtp = async (data: unknown) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};

export const resendOtp = async (data: unknown) => {
  const res = await api.post("/auth/resend-otp", data);
  return res.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};
