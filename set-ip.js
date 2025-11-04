// set-ip.js
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Port Spring Boot Backend (sesuaikan jika berbeda)
const SPRING_BOOT_PORT = 8080;

/**
 * Mendapatkan alamat IP lokal PC Server.
 * Menggunakan import 'node:os' untuk stabil di lingkungan ESM.
 * @returns {string} Alamat IP lokal yang terdeteksi (e.g., 192.168.1.5).
 */
function getLocalIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const netInterfaces = interfaces[interfaceName];
        for (const netInterface of netInterfaces) {
            // Pastikan itu IPv4 dan bukan loopback (127.0.0.1)
            if (netInterface.family === 'IPv4' && !netInterface.internal) {
                return netInterface.address;
            }
        }
    }
    // Fallback jika tidak ditemukan IP jaringan yang valid
    return '127.0.0.1';
}

// 1. Dapatkan IP dan susun URL
const localIp = getLocalIpAddress();
const baseUrl = `http://${localIp}:${SPRING_BOOT_PORT}`;

// 2. Tentukan jalur ke file .env.local dengan penanganan Windows (C:\C:\ error)
// Mengkonversi URL import.meta.url menjadi jalur sistem file yang benar
const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);

const envFilePath = path.join(rootDir, '.env.local');

// 3. Konten yang akan ditulis ke .env.local
const envContent = `VITE_API_BASE_URL=${baseUrl}\n`;

// 4. Tulis file
try {
    fs.writeFileSync(envFilePath, envContent, { encoding: 'utf-8' });
    console.log(`[Set-IP Success] IP ${localIp} berhasil diatur ke .env.local`);
    console.log(`[VITE_API_BASE_URL] = ${baseUrl}`);
} catch (error) {
    console.error('[Set-IP ERROR] Gagal menulis file .env.local. Periksa permission:', error);
}