"use client"

import { useState, useEffect } from "react"
import DoctorList from "@/components/doctor-list"
import DoctorForm from "@/components/doctor-form"
import type { Doctor } from "@/types/doctor"

export default function Home() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedDoctors = localStorage.getItem("doctors")
    if (savedDoctors) {
      setDoctors(JSON.parse(savedDoctors))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("doctors", JSON.stringify(doctors))
    }
  }, [doctors, isLoading])

  const handleAddDoctor = (newDoctor: Omit<Doctor, "id">) => {
    const doctor: Doctor = {
      ...newDoctor,
      id: Date.now().toString(),
    }
    setDoctors([...doctors, doctor])
    setIsFormOpen(false)
  }

  const handleUpdateDoctor = (updatedDoctor: Doctor) => {
    setDoctors(doctors.map((doc) => (doc.id === updatedDoctor.id ? updatedDoctor : doc)))
    setEditingDoctor(null)
    setIsFormOpen(false)
  }

  const handleDeleteDoctor = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus dokter ini?")) {
      setDoctors(doctors.filter((doc) => doc.id !== id))
    }
  }

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingDoctor(null)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manajemen Dokter</h1>
          <p className="text-gray-600">Rumah Sakit Dr. H. Muhammad Rabain</p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => {
              setEditingDoctor(null)
              setIsFormOpen(true)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            + Tambah Dokter
          </button>
        </div>

        {isFormOpen && (
          <DoctorForm
            doctor={editingDoctor}
            onSubmit={editingDoctor ? handleUpdateDoctor : handleAddDoctor}
            onClose={handleCloseForm}
          />
        )}

        <DoctorList doctors={doctors} onEdit={handleEditDoctor} onDelete={handleDeleteDoctor} />
      </div>
    </main>
  )
}
