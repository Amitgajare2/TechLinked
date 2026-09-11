import { api } from '../../lib/axios';



export const registerUser = async (data:any) => {
  const res = await api.post('/auth/register', data);
  return res.data;
}

export const login = async (data:any) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export const sendOtp = async (data:any) => {
  const res = await api.post('/auth/send-otp', data);
  return res.data;
};

export const verifyOtp = async (data:any) => {
  const res = await api.post('/auth/verify-otp', data);
  return res.data;
};

export const resendOtp = async (data:any) => {
  const res = await api.post('/auth/resend-otp', data);
  return res.data;
};

export const logout = async () => {
  const token = localStorage.getItem('login');
  await api.post(
    '/auth/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};