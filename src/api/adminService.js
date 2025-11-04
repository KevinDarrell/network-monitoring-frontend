import api from './axiosInstance';

const SAP_KEY = "SAP_CENTRAL_IP";

// --- Service untuk Dashboard ---
export const getDashboardStats = () => {
    return api.get('/api/admin/stats');
};

// --- Service untuk Company ---
export const getCompanies = () => {
    return api.get('/api/companies');
};
export const createCompany = (name) => {
    return api.post('/api/companies', { name });
};
export const deleteCompany = (id) => {
    return api.delete(`/api/companies/${id}`);
};

export const editCompany = (id, name) => {
    return api.put(`/api/companies/${id}`, name);
};

// --- Service untuk User ---
export const getUsers = () => {
    return api.get('/api/admin/users');
};
export const createUser = (userData) => { // userData = { username, password, role, companyId }
    return api.post('/api/admin/users', userData);
};
export const deleteUser = (id) => {
    return api.delete(`/api/admin/users/${id}`);
};

// --- Service untuk Jaringan (Settings, Timbangan, Device) ---
export const getSapIp = () => {
    return api.get(`/api/settings/${SAP_KEY}`);
};
export const saveSapIp = (ipAddress) => {
    return api.post('/api/settings', { key: SAP_KEY, value: ipAddress });
};
export const getTimbanganByCompany = (companyId) => {
    return api.get(`/api/timbangan/by-company/${companyId}`);
};
export const createTimbangan = (timbanganData) => { // { name, companyId }
    return api.post('/api/timbangan', timbanganData);
};
export const getDevicesByTimbangan = (timbanganId) => {
    return api.get(`/api/device/by-timbangan/${timbanganId}`);
};
export const createDevice = (deviceData) => { // { name, ipAddress, type, timbanganId }
    return api.post('/api/device', deviceData);
};
export const updateDevice = (id, deviceData) => { // { name, ipAddress, type }
    return api.put(`/api/device/${id}`, deviceData);
};
export const deleteDevice = (id) => {
    return api.delete(`/api/device/${id}`);
};
export const updateTimbangan = (id, timbanganData) => { 
  // timbanganData = { name, companyId }
  return api.put(`/api/timbangan/${id}`, timbanganData);
};
