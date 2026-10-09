import type { FC } from 'react'
import { Box, Plus, Scissors, Layers, Settings2, CheckCircle2 } from 'lucide-react'

export const CategoryFrameView: FC = () => {
  const categories = [
    {
      id: 'cat-1',
      name: 'Photo Strip 2x6 (Dual Cut)',
      dimensions: '2 x 6 inch (5 x 15 cm)',
      templatesCount: 18,
      cutterMode: 'Auto 2-inch Split Cut Enabled',
      basePrice: 35000,
      description: 'Format terpopuler untuk photobooth. 1 lembar 4R otomatis dipotong mesin menjadi 2 strip identik.',
      badge: 'Best Seller',
      color: 'border-blue-500 bg-blue-50/20',
    },
    {
      id: 'cat-2',
      name: 'Full 4R Postcard',
      dimensions: '4 x 6 inch (10 x 15 cm)',
      templatesCount: 12,
      cutterMode: 'Single Sheet (No Cut)',
      basePrice: 45000,
      description: 'Format kartu pos ukuran penuh untuk layout 2 foto besar atau kolase 4 foto landscape.',
      badge: 'Event Favorite',
      color: 'border-indigo-500 bg-indigo-50/20',
    },
    {
      id: 'cat-3',
      name: 'Square Polaroid Classic',
      dimensions: '4 x 4.5 inch',
      templatesCount: 8,
      cutterMode: 'Custom Margin Bleed',
      basePrice: 30000,
      description: 'Gaya polaroid klasik dengan ruang teks caption di bawah untuk stempel tanggal atau logo sponsor.',
      badge: 'Vintage',
      color: 'border-amber-500 bg-amber-50/20',
    },
    {
      id: 'cat-4',
      name: 'Wide Grid Collage (3R)',
      dimensions: '3.5 x 5 inch (9 x 13 cm)',
      templatesCount: 5,
      cutterMode: 'Standard Single Cut',
      basePrice: 35000,
      description: 'Format portrait ringkas untuk kolase 6 foto thumbnail mini bersama sahabat.',
      badge: 'New Format',
      color: 'border-emerald-500 bg-emerald-50/20',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Daftar Kategori Ukuran Cetak</h3>
          <p className="text-xs text-slate-500">Kelola setting hardware pisau printer DNP dan ukuran kertas</p>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          Tambah Kategori Ukuran
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-400 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Box className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{cat.name}</h4>
                    <span className="text-xs text-slate-500 font-mono font-medium">{cat.dimensions}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {cat.badge}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed">{cat.description}</p>

              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>{cat.templatesCount} Template Aktif</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Scissors className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{cat.cutterMode}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Base Price Rekomendasi</span>
                <span className="text-sm font-black text-slate-900">
                  Rp {cat.basePrice.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer">
                  <Settings2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Aktif di Semua Kiosk</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
