import React, { useState } from "react";
import useNetworkManagement from "@/hooks/useNetworkManagement";
import PageHeader from "@/components/common/PageHeader";
import Card from "@/components/common/Card";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import Button from "@/components/common/Button";
import EditDeviceModal from "@/components/admin/network/EditDeviceModal";
import DeviceTable from "@/components/admin/network/DeviceTable";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AdminNetwork() {
  const {
    sapIp, setSapIp, companies, timbangans, devices,
    loadTimbangans, loadDevices,
    saveSapIp, createTimbangan, createDevice, deleteDevice, editTimbangan, updateDevice
  } = useNetworkManagement();

  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedTimbangan, setSelectedTimbangan] = useState("");
  const [newTimbangan, setNewTimbangan] = useState("");
  const [device, setDevice] = useState({ name: "", ipAddress: "", type: "PLC" });

  // === State untuk edit nama timbangan ===
const [showEditTimbangan, setShowEditTimbangan] = useState(false);
const [editTimbanganName, setEditTimbanganName] = useState("");
const [timbanganToEdit, setTimbanganToEdit] = useState(null);

  // Dialog & Confirm States
  const [editDialog, setEditDialog] = useState({ open: false, editing: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  // --- Handlers ---
  const handleCompany = async (e) => {
    const id = e.target.value;
    setSelectedCompany(id);
    setSelectedTimbangan("");
    if (id) await loadTimbangans(id);
  };

  const handleTimbangan = async (e) => {
    const id = e.target.value;
    setSelectedTimbangan(id);
    if (id) await loadDevices(id);
  };

  const handleCreateTimbangan = async (e) => {
    e.preventDefault();
    try {
      await createTimbangan({ name: newTimbangan, companyId: selectedCompany });
      setNewTimbangan("");
      await loadTimbangans(selectedCompany);
      toast.success("Timbangan berhasil dibuat");
    } catch {
      toast.error("Gagal membuat timbangan");
    }
  };

  const handleCreateDevice = async (e) => {
    e.preventDefault();
    try {
      await createDevice({ ...device, timbanganId: selectedTimbangan });
      setDevice({ name: "", ipAddress: "", type: "PLC" });
      await loadDevices(selectedTimbangan);
      toast.success("Device berhasil ditambahkan");
    } catch {
      toast.error("Gagal menambahkan device");
    }
  };

  const handleDelete = (device) => setDeleteTarget(device);

  const confirmDelete = async () => {
  if (!deleteTarget?.id) return toast.error("ID device tidak valid ❌");

  try {
    await deleteDevice(deleteTarget.id);
    await loadDevices(selectedTimbangan);
    toast.success(`Device "${deleteTarget.name}" berhasil dihapus ✅`);
  } catch (err) {
    console.error(err);
    toast.error("Gagal menghapus device ❌");
  } finally {
    setDeleteTarget(null);
  }
};

  const handleSaveEdit = async (id, data) => {
    try {
      await updateDevice(id, data);
      setEditDialog({ open: false, editing: null });
      await loadDevices(selectedTimbangan);
      toast.success("Device berhasil diperbarui ✅");
    } catch {
      toast.error("Gagal memperbarui device ❌");
    }
  };

  const handleSaveSapIp = async (e) => {
    e.preventDefault();
    try {
      await saveSapIp(sapIp);
      toast.success("IP SAP berhasil disimpan");
    } catch {
      toast.error("Gagal menyimpan IP SAP");
    }
  };

  // --- UI ---
  return (
    <div className="p-6">
      <PageHeader
        title="Pengaturan Jaringan & Device"
        subtitle="Kelola konfigurasi SAP, timbangan, dan device jaringan Anda"
      />

      {/* ===== IP SAP CONFIG ===== */}
      <Card className="mb-8">
        <form onSubmit={handleSaveSapIp} className="space-y-3">
          <FormInput
            label="IP Server SAP"
            value={sapIp}
            onChange={(e) => setSapIp(e.target.value)}
            placeholder="Contoh: 192.168.1.10"
            required
          />
          <Button className="bg-blue-600 hover:bg-blue-700">Simpan IP SAP</Button>
        </form>
      </Card>

      {/* ===== DEVICE CONFIG ===== */}
      <Card>
        <div className="grid md:grid-cols-2 gap-10">
          {/* === Company & Timbangan === */}
          <div>
            <FormSelect
              label="Pilih Company"
              value={selectedCompany}
              onChange={handleCompany}
              className="mb-4"
            >
              <option value="">-- Pilih Company --</option>
              {companies.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </FormSelect>

            {selectedCompany && (
              <form
                onSubmit={handleCreateTimbangan}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm space-y-3"
              >
                <FormInput
                  label="Nama Timbangan Baru"
                  value={newTimbangan}
                  onChange={(e) => setNewTimbangan(e.target.value)}
                  placeholder="Misal: Timbangan Produksi 1"
                  required
                />
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  + Tambah Timbangan
                </Button>
              </form>
            )}

            {selectedCompany && (
              <FormSelect
                label="Pilih Timbangan"
                value={selectedTimbangan}
                onChange={handleTimbangan}
                className="mt-4"
              >
                <option value="">-- Pilih Timbangan --</option>
                {timbangans.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </FormSelect>
            )}
          </div>

          {/* === Device Form === */}
          {selectedTimbangan && (
            <form
              onSubmit={handleCreateDevice}
              className="space-y-3 bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <FormInput
                label="Nama Device"
                value={device.name}
                onChange={(e) => setDevice({ ...device, name: e.target.value })}
                placeholder="Contoh: PLC Conveyor"
                required
              />
              <FormInput
                label="IP Address"
                value={device.ipAddress}
                onChange={(e) => setDevice({ ...device, ipAddress: e.target.value })}
                placeholder="Contoh: 192.168.0.15"
                required
              />
              <FormSelect
                label="Tipe Device"
                value={device.type}
                onChange={(e) => setDevice({ ...device, type: e.target.value })}
              >
                <option value="PLC">PLC</option>
                <option value="BARRIER_GATE">Barrier Gate</option>
              </FormSelect>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                + Tambah Device
              </Button>
            </form>
          )}
        </div>

        {/* === Device Table === */}
      {/* === Device Table === */}
{selectedTimbangan && (
  <div className="mt-8">
    <div className="flex items-center gap-2 mb-3">
      <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        Daftar Device -{" "}
        {timbangans.find((t) => t.id === Number(selectedTimbangan))?.name}

        {/* Tombol kecil edit di sebelah nama timbangan */}
        <button
          onClick={() => {
            const timbangan = timbangans.find(
              (t) => t.id === Number(selectedTimbangan)
            );
            if (!timbangan) return;
            setTimbanganToEdit(timbangan);
            setEditTimbanganName(timbangan.name);
            setShowEditTimbangan(true);
          }}
          className="p-1 hover:bg-gray-200 rounded transition text-gray-700 text-sm"
          title="Edit nama timbangan"
        >
          ✏️
        </button>
      </h4>
    </div>

    <DeviceTable
      devices={devices}
      onEdit={(d) => setEditDialog({ open: true, editing: d })}
      onDelete={(d) => handleDelete(d)}
    />

    <EditDeviceModal
  open={editDialog.open}
  onClose={() => setEditDialog({ open: false, editing: null })}
  device={editDialog.editing}
  onSave={handleSaveEdit}
/>
  </div>
)}
      </Card>

      {/* === Edit Dialog === */}
      <Dialog
  open={showEditTimbangan}
  onOpenChange={(open) => {
    if (!open) {
      setShowEditTimbangan(false);
      setTimbanganToEdit(null);
    }
  }}
>
  <DialogContent className="sm:max-w-md rounded-xl">
    <DialogHeader>
      <DialogTitle>Edit Nama Timbangan</DialogTitle>
      <DialogDescription>
        Ubah nama timbangan di bawah ini dan simpan perubahan.
      </DialogDescription>
    </DialogHeader>

    <form
      onSubmit={async (e) => {
        e.preventDefault();
        try {
          await editTimbangan(timbanganToEdit.id, editTimbanganName);
          await loadTimbangans(selectedCompany);
          toast.success("Nama timbangan berhasil diperbarui ✅");
          setShowEditTimbangan(false);
        } catch (err) {
          console.error(err);
          toast.error("Gagal memperbarui nama timbangan ❌");
        }
      }}
      className="space-y-4 mt-4"
    >
      <FormInput
        label="Nama Timbangan"
        value={editTimbanganName}
        onChange={(e) => setEditTimbanganName(e.target.value)}
        required
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          className="bg-gray-300 text-gray-800 hover:bg-gray-400"
          onClick={() => setShowEditTimbangan(false)}
        >
          Batal
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Simpan Perubahan
        </Button>
      </div>
    </form>
  </DialogContent>
</Dialog>

      {/* === Confirm Delete === */}
      <ConfirmDialog
      
        open={!!deleteTarget}
        title="Konfirmasi Hapus"
        description={
          deleteTarget ? `Apakah Anda yakin ingin menghapus "${deleteTarget.name}"?` : ""
        }
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );

  
}
