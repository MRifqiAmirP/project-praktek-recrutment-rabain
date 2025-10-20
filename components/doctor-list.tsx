import type { Doctor } from "@/types/doctor"
import DoctorCard from "./doctor-card"

interface DoctorListProps {
  doctors: Doctor[]
  onEdit: (doctor: Doctor) => void
  onDelete: (id: string) => void
}

export default function DoctorList({ doctors, onEdit, onDelete }: DoctorListProps) {
  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">Belum ada data dokter. Silakan tambahkan dokter baru.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
