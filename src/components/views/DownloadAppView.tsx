import type { FC } from 'react'
import { Download, Monitor, ShieldCheck, Cpu, HardDrive } from 'lucide-react'

export const DownloadAppView: FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm">Download Kiosk Client & Driver Photobooth</h3>
        <p className="text-xs text-slate-500">
          Aplikasi native desktop untuk touchscreen mesin booth dengan fitur auto-detect DSLR Canon/Nikon dan printer DNP
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Windows Kiosk Client */}
        <div className="bg-white rounded-2xl border-2 border-blue-600/30 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-slate-900 text-base">MemoLab Kiosk Runner</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                v2.4.1 Latest
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Klien antarmuka touchscreen untuk Windows 10/11. Mendukung Canon EDSDK tethering dan print otomatis.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center justify-between">
                <span>Ukuran File:</span>
                <span className="font-mono font-bold">142 MB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Arsitektur:</span>
                <span className="font-mono">Windows 64-bit (.exe)</span>
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer">
            <Download className="w-4 h-4" />
            Download Installer (.exe)
          </button>
        </div>

        {/* Printer DNP Utility */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <HardDrive className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-slate-900 text-base">DNP Hot Folder Print Hub</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                Driver Pack
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Driver dan spooler print otomatis untuk DNP DS-RX1HS, DS620, dan Citizen CY-02 dengan fitur 2-inch cutter split.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center justify-between">
                <span>Ukuran File:</span>
                <span className="font-mono font-bold">68 MB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Kompatibilitas:</span>
                <span className="font-mono">DNP DS-RX1HS / DS620</span>
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer">
            <Download className="w-4 h-4" />
            Download Driver Pack (.zip)
          </button>
        </div>

        {/* Kiosk Guard Lockdown */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-slate-900 text-base">Kiosk Lock Guard</h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                Security
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Utilitas anti-tamper untuk mengunci layar kiosk dari intervensi pengunjung iseng (mematikan task manager, start menu).
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center justify-between">
                <span>Ukuran File:</span>
                <span className="font-mono font-bold">12 MB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Lisensi:</span>
                <span className="font-mono">Included with Pro Plan</span>
              </div>
            </div>
          </div>

          <button className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer">
            <Cpu className="w-4 h-4" />
            Download Tool (.bat / .exe)
          </button>
        </div>
      </div>
    </div>
  )
}
