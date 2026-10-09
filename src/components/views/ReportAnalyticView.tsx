import { useState } from 'react'
import type { FC } from 'react'
import {
  TrendingUp,
  CreditCard,
  Camera,
  Layers,
  Calendar,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
  Sparkles,
} from 'lucide-react'

export const ReportAnalyticView: FC = () => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today')

  const hourlyData = [
    { hour: '10:00', sessions: 12, revenue: 360000 },
    { hour: '11:00', sessions: 24, revenue: 720000 },
    { hour: '12:00', sessions: 48, revenue: 1440000 },
    { hour: '13:00', sessions: 62, revenue: 1860000 },
    { hour: '14:00', sessions: 45, revenue: 1350000 },
    { hour: '15:00', sessions: 58, revenue: 1740000 },
    { hour: '16:00', sessions: 76, revenue: 2280000 },
    { hour: '17:00', sessions: 94, revenue: 2820000 },
    { hour: '18:00', sessions: 110, revenue: 3300000 },
    { hour: '19:00', sessions: 125, revenue: 3750000 },
    { hour: '20:00', sessions: 102, revenue: 3060000 },
    { hour: '21:00', sessions: 68, revenue: 2040000 },
  ]

  const maxSessions = Math.max(...hourlyData.map((d) => d.sessions))

  const topTemplates = [
    { name: 'Korean 4-Cut Classic', category: 'Strip 2x6', count: 320, pct: 39, color: 'bg-blue-500' },
    { name: 'Y2K Retro Chrome', category: 'Strip 2x6', count: 245, pct: 30, color: 'bg-indigo-500' },
    { name: 'Vintage Polaroid Glow', category: 'Polaroid', count: 152, pct: 18, color: 'bg-amber-500' },
    { name: 'Valentine Romance', category: '4R Postcard', count: 107, pct: 13, color: 'bg-pink-500' },
  ]

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-slate-800">Date Range:</span>
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {(['today', 'week', 'month'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                  period === p
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p === 'today' ? 'Hari Ini' : p === 'week' ? '7 Hari Terakhir' : 'Bulan Ini'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            Semua Booth (3 Kiosk)
          </button>
          <button className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-all border border-blue-200/60 cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            Export CSV / PDF
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Pendapatan</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">Rp 24.720.000</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs periode lalu</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-emerald-500/5 rounded-full pointer-events-none" />
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Sesi Foto</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">824 Sesi</div>
            <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold mt-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Avg Rp 30.000 / sesi</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Lembar Cetak</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">1.648 Strips</div>
            <div className="flex items-center gap-1.5 text-xs text-purple-600 font-semibold mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>99.8% cetak sukses</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Rerata Durasi Sesi</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">2m 45s</div>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold mt-1">
              <span>Kecepatan throughput ideal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Peak Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Aktivitas Jam Sibuk (Peak Hours)</h3>
              <p className="text-xs text-slate-500">Jumlah sesi foto yang dilakukan sepanjang operasional kiosk</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/50">
              Peak: 19:00 - 20:00
            </span>
          </div>

          <div className="h-64 flex items-end gap-2.5 sm:gap-4 pt-4 border-b border-slate-100">
            {hourlyData.map((d) => {
              const heightPct = Math.round((d.sessions / maxSessions) * 100)
              const isPeak = d.sessions === maxSessions
              return (
                <div key={d.hour} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg whitespace-nowrap pointer-events-none z-10 shadow-lg">
                    {d.sessions} sesi • Rp {d.revenue.toLocaleString('id-ID')}
                  </div>
                  <div className="w-full bg-slate-100 rounded-t-lg relative flex items-end justify-center h-48 overflow-hidden">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full transition-all duration-500 rounded-t-lg ${
                        isPeak
                          ? 'bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md'
                          : 'bg-blue-400 hover:bg-blue-500'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 group-hover:text-blue-600">
                    {d.hour}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Template Popularity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Template Terlaris</h3>
              <Layers className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-xs text-slate-500 mb-6">Pilihan desain frame yang paling diminati pengunjung</p>

            <div className="space-y-4">
              {topTemplates.map((t) => (
                <div key={t.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{t.name}</span>
                    <span className="font-semibold text-slate-500">{t.count} ({t.pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${t.color}`}
                      style={{ width: `${t.pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{t.category}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-500">
            <span>Metode Bayar:</span>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 bg-slate-100 font-bold text-slate-700 rounded">QRIS 78%</span>
              <span className="px-2 py-0.5 bg-slate-100 font-bold text-slate-700 rounded">Cash 15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kiosk Telemetry Quick Summary */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-1">Performa Per Unit Photobooth (Kiosk)</h3>
        <p className="text-xs text-slate-500 mb-4">Status fisik hardware, sisa kertas DNP, dan omzet hari ini</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Booth 01 - Tunjungan Plaza</h4>
                <p className="text-[11px] text-slate-500">Lantai 3 Atrium Utara</p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full">
                ONLINE
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-100/80 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">Sisa Kertas: <strong className="text-emerald-700">180 Lembar</strong></span>
              <span className="text-slate-800 font-black">Rp 11.400.000</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Booth 02 - Mall Grand City</h4>
                <p className="text-[11px] text-slate-500">Cinema XXI Corridor</p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded-full">
                ONLINE
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-100/80 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">Sisa Kertas: <strong className="text-blue-700">95 Lembar</strong></span>
              <span className="text-slate-800 font-black">Rp 8.700.000</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Booth 03 - Cafe Senja Corner</h4>
                <p className="text-[11px] text-slate-500">Outdoor Terrace</p>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full">
                REFILL NEEDED
              </span>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-100/80 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600">Sisa Kertas: <strong className="text-amber-700">12 Lembar</strong></span>
              <span className="text-slate-800 font-black">Rp 4.620.000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
