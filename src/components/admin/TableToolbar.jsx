import { Button } from "@/components/ui/button"

export default function TableToolbar({ title, onAdd }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <Button onClick={onAdd}>+ Tambah</Button>
    </div>
  )
}
