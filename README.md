# Doctor Management Website (Test Praktek Rekrutment RS Rabain 2025)

Aplikasi web sederhana untuk mengelola data dokter rumah sakit dengan fitur Create, Read, Update, dan Delete (CRUD).

## Fitur Utama

- **Tambah Dokter** - Menambahkan dokter baru dengan informasi lengkap
- **Lihat Daftar Dokter** - Menampilkan semua dokter dalam format grid yang responsif
- **Edit Dokter** - Mengubah informasi dokter yang sudah terdaftar
- **Hapus Dokter** - Menghapus data dokter dengan konfirmasi
- **Penyimpanan Otomatis** - Data disimpan di localStorage browser (untuk development cepat, supaya tidak perlu setup database)

## Teknologi yang Digunakan

- **Next.js 15** - Framework React untuk aplikasi web
- **TypeScript** - Untuk type safety dan development experience yang lebih baik
- **Tailwind CSS** - Untuk styling yang responsif dan modern
- **React Hooks** - Untuk state management (useState, useEffect)
- **localStorage** - Untuk penyimpanan data di browser

## Cara Menjalankan

1. Clone atau download project ini
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Jalankan development server:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Buka browser dan akses `http://localhost:3000`

## Cara Menggunakan

### 1. Menambah Dokter Baru
- Klik tombol "Tambah Dokter Baru" di halaman utama
- Isi semua field yang diperlukan dalam form modal
- Klik tombol "Simpan" untuk menyimpan dokter baru

### 2. Melihat Daftar Dokter
- Semua dokter ditampilkan dalam format kartu (card) di halaman utama
- Setiap kartu menampilkan informasi lengkap dokter

### 3. Mengedit Dokter
- Klik tombol "Edit" pada kartu dokter yang ingin diubah
- Ubah informasi yang diperlukan dalam form modal
- Klik tombol "Simpan" untuk menyimpan perubahan

### 4. Menghapus Dokter
- Klik tombol "Hapus" pada kartu dokter yang ingin dihapus
- Konfirmasi penghapusan pada dialog yang muncul
- Dokter akan dihapus dari daftar

## Struktur File

\`\`\`
app/
├── page.tsx                 # Halaman utama aplikasi
├── layout.tsx              # Layout global
└── globals.css             # Styling global

components/
├── doctor-list.tsx         # Komponen daftar dokter
├── doctor-card.tsx         # Komponen kartu dokter individual
└── doctor-form.tsx         # Komponen form tambah/edit dokter

types/
└── doctor.ts               # Type definitions untuk dokter
\`\`\`

## Komponen Utama

### DoctorList
Komponen utama yang menampilkan daftar semua dokter dan mengelola state aplikasi.

### DoctorCard
Komponen untuk menampilkan informasi dokter individual dalam format kartu dengan tombol edit dan hapus.

### DoctorForm
Komponen form modal untuk menambah atau mengedit data dokter dengan validasi input.

## Penyimpanan Data

Data dokter disimpan di **localStorage** browser dengan key `doctors`. Ini berarti:
- Data akan tetap tersimpan meskipun browser ditutup
- Data bersifat lokal per browser (tidak tersinkronisasi antar device)

## Jika ingin menggunakan Database

Jika ingin menggunakan database MySQL atau PostgreSQL:

1. Buat API routes di `app/api/doctors/`
2. Implementasikan endpoints:
   - `GET /api/doctors` - Ambil semua dokter
   - `POST /api/doctors` - Tambah dokter baru
   - `PUT /api/doctors/[id]` - Edit dokter
   - `DELETE /api/doctors/[id]` - Hapus dokter

3. Update komponen untuk menggunakan API calls daripada localStorage