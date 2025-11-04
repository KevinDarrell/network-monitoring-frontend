import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddDataDialog({ onAdd }) {
  const [formData, setFormData] = useState({
    tanggal: "",
    shift: "",
    hasil: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tanggal || !formData.shift || !formData.hasil) return;
    onAdd(formData);
    setFormData({ tanggal: "", shift: "", hasil: "" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Tambah Data Produksi
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md animate-in fade-in zoom-in duration-200">
        <DialogHeader>
          <DialogTitle>Tambah Data Produksi</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal</label>
            <Input
              type="date"
              value={formData.tanggal}
              onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shift</label>
            <Input
              type="text"
              placeholder="Shift A / B / C"
              value={formData.shift}
              onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hasil Produksi</label>
            <Input
              type="number"
              placeholder="Jumlah hasil"
              value={formData.hasil}
              onChange={(e) => setFormData({ ...formData, hasil: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Simpan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
