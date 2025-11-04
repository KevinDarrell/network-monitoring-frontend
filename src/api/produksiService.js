import api from './axiosInstance';

/**
 * [PRODUKSI] Mengambil daftar timbangan HANYA untuk user yang sedang login
 */
export const getMyTimbangan = () => {
    return api.get('/api/timbangan/me');
};

/**
 * [PRODUKSI] Mengambil daftar device untuk satu timbangan
 */
export const getDevicesByTimbangan = (timbanganId) => {
    // Ini memanggil API yang sama dengan adminService,
    // tapi kita pisah filenya agar rapi
    return api.get(`/api/device/by-timbangan/${timbanganId}`);
};