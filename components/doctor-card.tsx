"use client"

import type { Doctor } from "@/types/doctor"

interface DoctorCardProps {
  doctor: Doctor
  onEdit: (doctor: Doctor) => void
  onDelete: (id: string) => void
}

export default function DoctorCard({ doctor, onEdit, onDelete }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
        <p className="text-blue-600 font-semibold">{doctor.specialization}</p>
      </div>

      <div className="space-y-2 mb-6 text-sm text-gray-600">
        <p>
          <span className="font-semibold">No. Lisensi:</span> {doctor.licenseNumber}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {doctor.email}
        </p>
        <p>
          <span className="font-semibold">Telepon:</span> {doctor.phone}
        </p>
        <p>
          <span className="font-semibold">Pengalaman:</span> {doctor.experience} tahun
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(doctor)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(doctor.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Hapus
        </button>
      </div>
    </div>
  )
}
