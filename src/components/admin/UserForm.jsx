import React, { useState } from "react";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import Button from "@/components/common/Button";

export default function UserForm({ companies, onSubmit, loading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_PRODUKSI");
  const [companyId, setCompanyId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "ROLE_PRODUKSI" && !companyId) {
      alert('User dengan Role "Produksi" harus memilih Company.');
      return;
    }

    onSubmit({ username, password, role, companyId });
    setUsername("");
    setPassword("");
    setRole("ROLE_PRODUKSI");
    setCompanyId("");
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-4">Buat User Baru</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormSelect
          label="Role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ROLE_PRODUKSI">Produksi</option>
          <option value="ROLE_ADMIN">Admin</option>
        </FormSelect>

        <FormSelect
          label="Company"
          id="company"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          disabled={role === "ROLE_ADMIN"}
          required={role === "ROLE_PRODUKSI"}
        >
          <option value="">-- Pilih Company --</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </FormSelect>

        <Button loading={loading}>Buat User</Button>
      </form>
    </>
  );
}
