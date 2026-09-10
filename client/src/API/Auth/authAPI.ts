import { api } from '../../lib/axios';


export const login = async (data:any) => {
  const res = await api.post('/auth/login', data);
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