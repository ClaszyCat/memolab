import type { FC } from 'react'
import { BookOpen, Printer, Camera, QrCode, MonitorCheck, ExternalLink } from 'lucide-react'

export const TutorialView: FC = () => {
  const guides = [
    {
      title: 'Panduan Ganti Ribbon & Roll Kertas Printer DNP DS-RX1HS',
      category: 'Hardware Printer',
      icon: Printer,
      duration: '4 menit baca',
      steps: [
        'Buka tuas depan printer DNP saat status lampu kuning berkedip.',
        'Keluarkan sisa gulungan kertas lama dan ganti roll kertas 4x6 inch baru dengan memutar spool searah jarum jam.',
        'Pasang ribbon tinta baru sesuai kode warna (kuning ke spool penarik).',
        'Tutup cover rapat hingga mesin otomatis memotong 3 strip kertas uji inisialisasi.',
      ],
    },
    {
      title: 'Koneksi Tethering Canon DSLR EOS ke PC Kiosk',
      category: 'Kamera & Lighting',
      icon: Camera,
      duration: '3 menit baca',
      steps: [
        'Hubungkan kabel USB Micro/Type-C berkualitas tinggi dengan gold plated connector dari kamera ke USB 3.0 PC.',
        'Atur mode dial kamera ke posisi "M" (Manual), Shutter Speed 1/125s, Aperture f/5.6, ISO 200.',
        'Pastikan Auto Power Off pada menu kamera diubah ke "Disable".',
        'Buka MemoLab Kiosk Client dan klik "Test Live View".',
      ],
    },
    {
      title: 'Konfigurasi QRIS Dinamis & EDC Settlement',
      category: 'Sistem Pembayaran',
      icon: QrCode,
      duration: '5 menit baca',
      steps: [
        'Dapatkan API Key dan Merchant ID dari Midtrans/Xendit/DOKU merchant portal.',
        'Masukkan API Key ke menu Pengaturan Pembayaran di MemoLab Kiosk.',
        'Lakukan uji transaksi Rp 1.000 menggunakan BCA / GoPay / OVO untuk verifikasi webhook notifikasi otomatis.',
      ],
    },
    {
      title: 'Setting Touchscreen Kiosk Lockdown Mode (Windows 11 Kiosk)',
      category: 'Sistem Operasi',
      icon: MonitorCheck,
      duration: '3 menit baca',
      steps: [
        'Jalankan script KioskRunner.bat yang tersedia di menu Download App.',
        'Script akan mengunci Windows Taskbar, shortcut Alt+Tab, dan tombol Windows agar pengguna tidak keluar dari aplikasi.',
        'Gunakan kombinasi kunci rahasia admin 5-tap di pojok kanan atas untuk keluar ke desktop.',
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Pusat Bantuan & SOP Operasional Hardware</h3>
          <p className="text-xs text-slate-500">Panduan teknis bagi teknisi dan kru jaga photobooth</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
          <span>Unduh PDF SOP MemoLab</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((g, idx) => {
          const Icon = g.icon
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      {g.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{g.duration}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm mt-3">{g.title}</h4>

                <div className="mt-4 space-y-2">
                  {g.steps.map((st, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">
                  <BookOpen className="w-3.5 h-3.5" />
                  Buka Video Tutorial Lengkap
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
