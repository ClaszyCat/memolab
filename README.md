# MEMOLAB - Photobooth Management & Kiosk System

Aplikasi manajemen operasional bisnis photobooth dan antarmuka touchscreen kiosk interaktif bergaya **Korean Y2K Pop Photobooth**.

---

## 📸 Fitur Utama

### 1. Antarmuka Kiosk Touchscreen Pengunjung (`/booth`)
* **Layar Sentuh Interaktif**: Alur terpadu mulai dari sambutan, pemilihan format kanvas, jepret foto, filter, pembayaran, hingga cetak otomatis.
* **Format Kanvas & Frame**:
  * Photo Strip 2x6 (3 Cut & 4 Cut Dual-Split)
  * Full 4R Postcard
  * Polaroid Square
  * ID Photo Pass (4x6 cm)
* **Kamera Studio & Webcam**: Terhubung langsung ke webcam browser atau kamera DSLR tethering dengan live countdown, panduan crosshair, dan audio beeper.
* **Editor Foto Anti-Gepeng**:
  * Perhitungan aspect ratio otomatis tanpa distorsi atau pemotongan wajah berlebih.
  * Kontrol **Zoom In/Out** dan **Pan Naik/Turun** per foto.
  * Fitur **Tukar Posisi (Swap)** dan **Pindah Urutan** antar slot foto.
  * Filter warna kamera (Natural Glow, B&W Film, Y2K Warmth, Cyber Cool, 90s Grain).
  * Stiker dekorasi dan teks caption stempel tanggal.
* **Pembayaran QRIS Dinamis**: Simulasi pembayaran instan dan cetak printer sublimasi DNP.
* **Unduh Softfile PNG**: Hasil komposit frame dirender langsung beresolusi tinggi ke file `.PNG`.

### 2. Panel Admin & Manajemen Bisnis
* **Report Analytic (`/report-analytic`)**: Ringkasan performa omzet, jam sibuk (peak hours), template frame terlaris, dan telemetri hardware.
* **Dashboard Fleet (`/dashboard`)**: Pemantauan langsung status mesin kiosk, sisa roll kertas printer DNP, dan koneksi kamera.
* **Transaksi & Bar Chart (`/transaction`)**:
  * Log transaksi lengkap dengan struk digital kasir.
  * Bar chart omzet bulanan sepanjang 2026 dengan highlight bulan puncak.
  * Donut chart distribusi metode pembayaran (QRIS, Cash, Debit).
  * Ekspor laporan ke format `.CSV`.
* **Template Frame Studio (`/template-frame`)**:
  * Katalog template frame aktif di mesin kiosk.
  * **Frame Builder Studio**: Editor visual untuk merancang frame baru (format, warna HEX, tekstur grid wireframe, font, stiker) dan langsung deploy ke seluruh unit booth.
* **Galeri Media & Retensi (`/galery` atau `/gallery`)**:
  * **Level 1 Overview**: Ringkasan media per unit booth (total sessions, images, videos).
  * **Level 2 Detail Sesi**: Filter tanggal, pencarian sesi foto, status izin shareable, serta kebijakan retensi otomatis 2 bulan (60 hari) agar server cloud tetap cepat.
* **Manajemen Lainnya**:
  * Filter LUT Kamera (`/filter`)
  * Banner Promo & Screensaver Kiosk (`/banner-promo`)
  * Panduan SOP Hardware & Ganti Kertas (`/tutorial`)
  * Download Client Desktop Kiosk Runner (`/download-app`)
  * Kuota Lisensi Langganan (`/subscription`)
  * Hak Akses Operator & Kru (`/user-management`)

---

## 🛠️ Teknologi yang Digunakan

* **Framework**: React 19 + TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS v4
* **Routing**: React Router DOM v7
* **Icons**: Lucide React
* **Grafis & Render**: HTML5 2D Canvas API

---

## 🚀 Panduan Menjalankan Proyek

### 1. Prasyarat
* Node.js versi 18 atau lebih baru
* npm atau yarn / pnpm

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Lokal (Development)
```bash
npm run dev
```
Buka browser pada: `http://localhost:5173`

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build siap deploy akan berada di folder `dist/`.

---

## 🧭 Daftar Rute Halaman

| Rute | Deskripsi |
|---|---|
| `/booth` | Layar Sentuh Kiosk Pengunjung (Fullscreen) |
| `/login` | Halaman Masuk Akun Pengelola |
| `/register` | Halaman Pendaftaran Bisnis Baru |
| `/dashboard` | Pemantauan Mesin Kiosk & Telemetri Hardware |
| `/report-analytic` | Analisis Performa Bisnis & Omzet |
| `/transaction` | Riwayat Transaksi & Bar Chart Bulanan |
| `/template-frame` | Katalog Frame & Frame Builder Studio |
| `/galery` atau `/gallery` | Galeri Hasil Jepretan Pengunjung (Retensi 2 Bulan) |
| `/category-frame` | Pengaturan Ukuran Cetak Kertas Printer DNP |
| `/filter` | Konfigurasi Preset Filter LUT Kamera |
| `/banner-promo` | Pengaturan Banner & Screensaver Standby |
| `/tutorial` | SOP & Panduan Penggantian Hardware |
| `/download-app` | Unduh Installer Desktop Kiosk Runner |
| `/subscription` | Informasi Paket Kuota Kiosk Cloud |
| `/user-management` | Pengaturan Staf Operator & Teknisi |

---

## 📄 Lisensi
Hak Cipta © 2026 MEMOLAB Technologies.
