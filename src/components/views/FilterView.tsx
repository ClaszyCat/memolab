import { useState } from 'react'
import type { FC } from 'react'
import { Sparkles, Check, Sliders, SunMedium } from 'lucide-react'

const FILTERS = [
  {
    id: 'filter-1',
    name: 'Natural Glow (Default)',
    description: 'Tone kulit cerah lembut, saturasi seimbang, cocok untuk semua jenis pencahayaan studio.',
    lut: 'Soft Warm Balance',
    sampleGradient: 'from-amber-100 via-rose-100 to-sky-100',
    popular: true,
  },
  {
    id: 'filter-2',
    name: 'B&W High Contrast Noir',
    description: 'Hitam putih dramatis dengan kontras tinggi gaya majalah fashion editorial.',
    lut: 'Monochrome Pro 100',
    sampleGradient: 'from-neutral-900 via-neutral-600 to-neutral-200',
    popular: true,
  },
  {
    id: 'filter-3',
    name: 'Y2K Golden Hour Warmth',
    description: 'Sentuhan keemasan hangat nostalgia tahun 2000-an dengan sedikit glow di highlight.',
    lut: 'Kodak Portra 400 Sim',
    sampleGradient: 'from-orange-200 via-amber-200 to-yellow-100',
    popular: false,
  },
  {
    id: 'filter-4',
    name: 'Cyberpunk Neon Cool',
    description: 'Kombinasi warna biru cyan dingin dan ungu magenta untuk tema neon kekinian.',
    lut: 'Teal & Orange Cyber',
    sampleGradient: 'from-cyan-400 via-blue-500 to-purple-600',
    popular: false,
  },
  {
    id: 'filter-5',
    name: 'Japanese Film Pastel',
    description: 'Fade shadow halus, warna pastel lembut ala kamera film analog Jepang.',
    lut: 'Fuji Pro 400H',
    sampleGradient: 'from-teal-100 via-pink-100 to-sky-100',
    popular: false,
  },
  {
    id: 'filter-6',
    name: 'Vintage 90s Grain',
    description: 'Tekstur grain halus dengan black point yang sedikit terangkat untuk look retro sejati.',
    lut: 'Retro Grain v2',
    sampleGradient: 'from-stone-300 via-amber-100 to-stone-400',
    popular: false,
  },
]

export const FilterView: FC = () => {
  const [activeFilterId, setActiveFilterId] = useState('filter-1')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Preset Filter & LUT Warna Kamera</h3>
          <p className="text-xs text-slate-500">Filter ini dapat dipilih oleh pengunjung sebelum atau sesudah berfoto di layar kiosk</p>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all cursor-pointer">
          <Sparkles className="w-4 h-4" />
          Import File 3D LUT (.cube)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FILTERS.map((f) => {
          const isSelected = activeFilterId === f.id
          return (
            <div
              key={f.id}
              onClick={() => setActiveFilterId(f.id)}
              className={`bg-white rounded-2xl border p-5 shadow-xs transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-600/20'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Visual Preview Swatch */}
                <div
                  className={`h-36 rounded-xl bg-gradient-to-tr ${f.sampleGradient} flex items-center justify-center p-4 relative overflow-hidden shadow-inner`}
                >
                  <div className="bg-white/85 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                    <SunMedium className="w-3.5 h-3.5 text-blue-600" />
                    <span>Live Camera Sample</span>
                  </div>
                  {f.popular && (
                    <span className="absolute top-2.5 right-2.5 bg-blue-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs">
                      Default Kiosk
                    </span>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">{f.name}</h4>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{f.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  {f.lut}
                </span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <Sliders className="w-3 h-3" />
                  Aktif di Kiosk
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
