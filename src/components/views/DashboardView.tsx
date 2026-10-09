import type { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  Monitor,
  Printer,
  Sparkles,
  Camera,
  RotateCw,
  Power,
  Sliders,
  Play,
  Layers,
} from 'lucide-react'

export const DashboardView: FC = () => {
  const kiosks = [
    {
      id: 'BOOTH-01',
      name: 'Booth 01 - Tunjungan Plaza',
      location: 'Lantai 3 Atrium Utara',
      status: 'online',
      paper: 68,
      paperCount: '180 / 350',
      ribbon: 75,
      camera: 'Canon EOS 200D II (Connected)',
      temperature: '38°C (Normal)',
      todaySessions: 38,
      todayRevenue: 1330000,
    },
    {
      id: 'BOOTH-02',
      name: 'Booth 02 - Mall Grand City',
      location: 'Cinema XXI Corridor',
      status: 'busy',
      paper: 45,
      paperCount: '95 / 350',
      ribbon: 50,
      camera: 'Canon EOS 200D II (In Session)',
      temperature: '41°C (Normal)',
      todaySessions: 29,
      todayRevenue: 1015000,
    },
    {
      id: 'BOOTH-03',
      name: 'Booth 03 - Cafe Senja Corner',
      location: 'Outdoor Terrace',
      status: 'warning',
      paper: 12,
      paperCount: '12 / 350',
      ribbon: 15,
      camera: 'Canon EOS M50 (Connected)',
      temperature: '44°C (Warm)',
      todaySessions: 16,
      todayRevenue: 560000,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-xs font-semibold text-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>MemoLab Cloud Hub v2.4</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">Selamat Datang di Command Center</h2>
          <p className="text-xs text-blue-100/80 max-w-xl mt-1">
            Pantau semua unit photobooth secara real-time. Kelola frame, cek sisa stok kertas ribbon printer DNP, dan monitor omzet harian.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link
            to="/booth"
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg transition-all cursor-pointer no-underline"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Buka Layar Kiosk (/booth)</span>
          </Link>
        </div>
      </div>

      {/* Fleet Monitoring Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Live Kiosk Hardware Fleet</h3>
            <p className="text-xs text-slate-500">Status konektivitas mesin, kamera DSLR, dan printer thermal</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Refresh Telemetri</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kiosks.map((kiosk) => (
            <div
              key={kiosk.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{kiosk.name}</h4>
                      <p className="text-[11px] text-slate-400">{kiosk.location}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      kiosk.status === 'online'
                        ? 'bg-emerald-100 text-emerald-800'
                        : kiosk.status === 'busy'
                        ? 'bg-blue-100 text-blue-800 animate-pulse'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {kiosk.status}
                  </span>
                </div>

                <div className="space-y-3 mt-4 pt-3 border-t border-slate-100 text-xs">
                  {/* Paper status bar */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-slate-500 flex items-center gap-1 font-semibold">
                        <Printer className="w-3 h-3 text-slate-400" />
                        Kertas Cetak DNP
                      </span>
                      <span className="font-bold text-slate-800">{kiosk.paperCount}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          kiosk.paper < 20 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${kiosk.paper}%` }}
                      />
                    </div>
                  </div>

                  {/* Hardware Diagnostics */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">DSLR Kamera</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 truncate">
                        <Camera className="w-3 h-3 text-blue-500 flex-shrink-0" />
                        {kiosk.camera}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Suhu CPU Mini PC</span>
                      <span className="font-semibold text-slate-800">{kiosk.temperature}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom stats and remote actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Sesi Hari Ini</span>
                  <span className="text-xs font-bold text-slate-800">
                    {kiosk.todaySessions} Sesi (Rp {kiosk.todayRevenue.toLocaleString('id-ID')})
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    title="Kirim Perintah Test Print"
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                  <button
                    title="Restart Remote Kiosk"
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                  >
                    <Power className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Deploy Template Baru</h4>
          <p className="text-xs text-slate-500 mt-1">
            Unggah desain frame PNG kustom musiman (Valentine, Ramadhan, Wisuda) langsung ke touchscreen kiosk.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Sliders className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Kalibrasi Kamera & Pencahayaan</h4>
          <p className="text-xs text-slate-500 mt-1">
            Atur Shutter speed, ISO, dan Aperture Canon DSLR serta sinkronisasi flash ring light otomatis.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Printer className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Peringatan Kertas Menipis</h4>
          <p className="text-xs text-slate-500 mt-1">
            Booth 03 membutuhkan penggantian ribbon dan roll kertas DNP RX1HS (tersisa 12 lembar).
          </p>
        </div>
      </div>
    </div>
  )
}
