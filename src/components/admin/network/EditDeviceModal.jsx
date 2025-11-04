import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import Button from "@/components/common/Button";
import { useState, useEffect } from "react";

export default function EditDeviceModal({ open, onClose, device, onSave }) {
  const [form, setForm] = useState({ name: "", ipAddress: "", type: "PLC" });

  useEffect(() => {
    if (device) setForm({ name: device.name, ipAddress: device.ipAddress, type: device.type });
  }, [device]);

  if (!device) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>Edit Device</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(device.id, form);
          }}
          className="space-y-4 mt-4"
        >
          <FormInput
            label="Nama Device"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <FormInput
            label="IP Address"
            value={form.ipAddress}
            onChange={(e) => setForm({ ...form, ipAddress: e.target.value })}
            required
          />
          <FormSelect
            label="Tipe Device"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="PLC">PLC</option>
            <option value="BARRIER_GATE">Barrier Gate</option>
          </FormSelect>

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
              Batal
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Simpan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
