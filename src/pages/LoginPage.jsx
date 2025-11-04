import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getMe } from "@/api/authService";
import "@/styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔹 1. Proses login ke backend
      const res = await login(formData.username, formData.password);

      if (res.success) {
        // 🔹 2. Tunggu sedikit agar cookie session aktif
        await new Promise((r) => setTimeout(r, 100));

        // 🔹 3. Ambil data user untuk cek role
        const { data: user } = await getMe();
        console.log("User login:", user);

        // 🔹 4. Arahkan sesuai role
        switch (user.role) {
          case "ROLE_ADMIN":
            navigate("/admin/dashboard");
            break;
          case "ROLE_PRODUKSI":
            navigate("/produksi/dashboard");
            break;
          default:
            setError("Role user tidak dikenal.");
        }
      } else {
        setError("Username atau password salah.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card animate-fadeIn">
        {/* Logo perusahaan di tengah */}
        <div className="login-logo-wrapper">
          <img src="/logo.png" alt="Company Logo" className="login-logo" />
        </div>

        <h2 className="login-title">Masuk ke Sistem Monitoring</h2>
        <p className="login-subtitle">Gunakan akun resmi Anda untuk melanjutkan</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`login-button ${loading ? "loading" : ""}`}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
