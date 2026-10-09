import type { FC } from 'react'
import { Ticket, Plus, Calendar, CheckCircle2, Trash2 } from 'lucide-react'

export const BannerPromoView: FC = () => {
  const banners = [
    {
      id: 'banner-1',
      title: 'Promo Valentine Buy 1 Get 1 Strip',
      kioskTarget: 'Semua Kiosk',
      activePeriod: '10 Feb - 20 Feb 2026',
      status: 'Active',
      color: 'from-pink-500 to-rose-600',
    },
    {
      id: 'banner-2',
      title: 'Diskon Pelajar 20% Tunjukkan Kartu Pelajar',
      kioskTarget: 'Booth 01 (Tunjungan Plaza)',
      activePeriod: 'Selalu Aktif',
      status: 'Active',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      id: 'banner-3',
      title: 'Idle Screensaver: Tap Screen to Start Smiling',
      kioskTarget: 'Semua Kiosk',
      activePeriod: 'Default Kiosk Idle Loop',
      status: 'Active',
      color: 'from-amber-500 to-orange-600',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Banner Promo & Screensaver Kiosk</h3>
          <p className="text-xs text-slate-500">
            Gambar promosi yang tampil berputar di layar sentuh saat photobooth sedang tidak digunakan
          </p>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          Tambah Banner Promo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div
                className={`h-40 bg-gradient-to-r ${b.color} p-5 text-white flex flex-col justify-between relative`}
              >
                <div className="flex justify-between items-start">
                  <span className="bg-white/20 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Screensaver Slot
                  </span>
                  <Ticket className="w-5 h-5 opacity-70" />
                </div>
                <h4 className="font-black text-lg leading-tight drop-shadow-xs">{b.title}</h4>
              </div>

              <div className="p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400">Target Display:</span>
                  <span className="font-bold text-slate-800">{b.kioskTarget}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Periode:
                  </span>
                  <span className="font-medium text-slate-700">{b.activePeriod}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" />
                Ditampilkan
              </span>
              <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
