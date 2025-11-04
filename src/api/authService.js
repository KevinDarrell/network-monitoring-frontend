import api from './axiosInstance';

/**
 * Login ke Spring Boot
 */
export const login = async (username, password) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  try {
    const response = await api.post('/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true // ✅ wajib agar session cookie tersimpan
    });
    return { success: true, status: response.status };
  } catch (error) {
    console.error("Error di authService.login:", error.response?.data || error.message);
    return { success: false, status: error.response?.status };
  }
};

/**
 * Logout
 */
export const logout = () => {
  return api.post('/logout', {}, { withCredentials: true });
};

/**
 * Ambil data user yang sedang login
 */
export const getMe = async () => {
  try {
    const res = await api.get('/api/admin/users/me');
    return res;
  } catch (err) {
    console.error("Gagal getMe:", err.response?.status);
    throw err;
  }
};
