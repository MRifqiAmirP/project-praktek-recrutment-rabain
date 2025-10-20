"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Doctor } from "@/types/doctor"

interface DoctorFormProps {
  doctor?: Doctor | null
  onSubmit: (doctor: Doctor | Omit<Doctor, "id">) => void
  onClose: () => void
}

export default function DoctorForm({ doctor, onSubmit, onClose }: DoctorFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    licenseNumber: "",
    email: "",
    phone: "",
    experience: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name,
        specialization: doctor.specialization,
        licenseNumber: doctor.licenseNumber,
        email: doctor.email,
        phone: doctor.phone,
        experience: doctor.experience.toString(),
      })
    }
  }, [doctor])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Nama dokter harus diisi"
    if (!formData.specialization.trim()) newErrors.specialization = "Spesialisasi harus diisi"
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "No. Lisensi harus diisi"
    if (!formData.email.trim()) newErrors.email = "Email harus diisi"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email tidak valid"
    if (!formData.phone.trim()) newErrors.phone = "Telepon harus diisi"
    if (!formData.experience) newErrors.experience = "Pengalaman harus diisi"
    if (Number.parseInt(formData.experience) < 0) newErrors.experience = "Pengalaman tidak boleh negatif"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const submitData = doctor
      ? { ...doctor, ...formData, experience: Number.parseInt(formData.experience) }
      : { ...formData, experience: Number.parseInt(formData.experience) }

    onSubmit(submitData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{doctor ? "Edit Dokter" : "Tambah Dokter Baru"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Dokter</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan nama dokter"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Spesialisasi</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.specialization ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Pilih Spesialisasi</option>
              <option value="Umum">Dokter Umum</option>
              <option value="Gigi">Dokter Gigi</option>
              <option value="Jantung">Kardiologi</option>
              <option value="Saraf">Neurologi</option>
              <option value="Anak">Pediatri</option>
              <option value="Kandungan">Obstetri & Ginekologi</option>
              <option value="Mata">Oftalmologi</option>
              <option value="Orthopedi">Orthopedi</option>
            </select>
            {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">No. Lisensi</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.licenseNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan nomor lisensi"
            />
            {errors.licenseNumber && <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Telepon</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan nomor telepon"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Pengalaman (tahun)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.experience ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan tahun pengalaman"
              min="0"
            />
            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-2 px-4 rounded transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              {doctor ? "Simpan Perubahan" : "Tambah Dokter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
