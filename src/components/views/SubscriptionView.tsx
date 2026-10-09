import type { FC } from 'react'
import { CheckCircle2, Zap } from 'lucide-react'

export const SubscriptionView: FC = () => {
  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200 mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            Paket Aktif Saat Ini
          </div>
          <h3 className="text-2xl font-black">MemoLab Business Pro (5 Kiosk Slots)</h3>
          <p className="text-xs text-blue-100/80 mt-1 max-w-lg">
            Lisensi cloud aktif sampai <strong>18 November 2026</strong>. Anda sedang menggunakan 3 dari 5 slot kiosk yang tersedia.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center min-w-[180px]">
          <span className="text-[11px] text-blue-200 block uppercase font-bold tracking-wider">Slot Terpakai</span>
          <div className="text-2xl font-black mt-1">3 / 5 Booth</div>
          <span className="text-[10px] text-emerald-300 font-semibold">2 Slot Kosong Tersedia</span>
        </div>
      </div>

      {/* Subscription Features & Upgrade */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Paket Starter</h4>
            <div className="text-xl font-black text-slate-800 mt-2">Rp 250.000 <span className="text-xs text-slate-400 font-normal">/ booth / bln</span></div>
            <p className="text-xs text-slate-500 mt-2">Cocok untuk booth tunggal pop-up atau event weekend.</p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1 Mesin Kiosk</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Frame Unlimited</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> QRIS Dynamic</div>
            </div>
          </div>
          <button className="w-full mt-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer">
            Pilih Starter
          </button>
        </div>

        <div className="bg-white rounded-2xl border-2 border-blue-600 p-6 shadow-md flex flex-col justify-between relative">
          <span className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full shadow-sm">
            Paket Aktif Anda
          </span>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Business Pro Multi-Kiosk</h4>
            <div className="text-xl font-black text-blue-600 mt-2">Rp 990.000 <span className="text-xs text-slate-400 font-normal">/ bln</span></div>
            <p className="text-xs text-slate-500 mt-2">Solusi terbaik untuk pemilik 3-5 cabang mall atau cafe.</p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Hingga 5 Kiosk Terhubung</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Realtime Telemetri & Sisa Kertas</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Auto WhatsApp Share Link</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Custom Watermark & Branding</div>
            </div>
          </div>
          <button className="w-full mt-6 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm cursor-pointer">
            Kelola Penagihan
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Enterprise Franchise</h4>
            <div className="text-xl font-black text-slate-800 mt-2">Hubungi Sales</div>
            <p className="text-xs text-slate-500 mt-2">Untuk jaringan waralaba 10+ booth dengan integrasi ERP.</p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Kiosk Tanpa Batas</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> White-label Domain Sendiri</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Dedicated Cloud Server</div>
            </div>
          </div>
          <button className="w-full mt-6 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer">
            Kontak Sales
          </button>
        </div>
      </div>
    </div>
  )
}
