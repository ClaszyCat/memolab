import { useState, useRef } from 'react'
import type { FC } from 'react'
import {
  Eye,
  Check,
  SlidersHorizontal,
  ImageUp,
  Palette,
  Type,
  Sparkles,
  Download,
  RotateCcw,
  CheckCircle2,
  Wand2,
  LayoutGrid,
  Columns,
  Square,
} from 'lucide-react'

interface FrameItem {
  id: string
  name: string
  category: 'Strip 2x6' | '4R Postcard' | 'Polaroid'
  slots: number
  price: number
  activeOnBooths: number
  previewColor: string
  aspectRatio: string
  tags: string[]
}

const INITIAL_FRAMES: FrameItem[] = [
  {
    id: 'frame-1',
    name: 'Korean 4-Cut Classic Pastel',
    category: 'Strip 2x6',
    slots: 4,
    price: 35000,
    activeOnBooths: 3,
    previewColor: 'from-pink-100 to-rose-200',
    aspectRatio: 'aspect-[1/3]',
    tags: ['Best Seller', 'Korean', 'Pastel'],
  },
  {
    id: 'frame-2',
    name: 'Y2K Cyberpunk Metallic',
    category: 'Strip 2x6',
    slots: 3,
    price: 35000,
    activeOnBooths: 3,
    previewColor: 'from-purple-900 via-indigo-900 to-slate-900',
    aspectRatio: 'aspect-[1/3]',
    tags: ['Y2K', 'Retro', 'Trending'],
  },
  {
    id: 'frame-3',
    name: 'Minimalist Clean White Postcard',
    category: '4R Postcard',
    slots: 4,
    price: 45000,
    activeOnBooths: 2,
    previewColor: 'from-slate-100 to-slate-200',
    aspectRatio: 'aspect-[3/2]',
    tags: ['4R', 'Minimalist', 'Aesthetic'],
  },
  {
    id: 'frame-4',
    name: 'Vintage Polaroid Serif Date',
    category: 'Polaroid',
    slots: 1,
    price: 30000,
    activeOnBooths: 3,
    previewColor: 'from-amber-50 to-orange-100',
    aspectRatio: 'aspect-[3/4]',
    tags: ['Polaroid', 'Vintage'],
  },
  {
    id: 'frame-5',
    name: 'Midnight Star Film Border',
    category: 'Strip 2x6',
    slots: 4,
    price: 35000,
    activeOnBooths: 1,
    previewColor: 'from-slate-900 to-blue-950',
    aspectRatio: 'aspect-[1/3]',
    tags: ['Night', 'Stars'],
  },
  {
    id: 'frame-6',
    name: 'Wedding Romance Botanical',
    category: '4R Postcard',
    slots: 4,
    price: 50000,
    activeOnBooths: 2,
    previewColor: 'from-emerald-50 via-teal-100 to-emerald-100',
    aspectRatio: 'aspect-[3/2]',
    tags: ['Event', 'Floral'],
  },
]

// Realistic placeholder portraits for builder preview
const BUILDER_PLACEHOLDER_PHOTOS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80',
]

// Builder Color Presets
const BUILDER_COLOR_PRESETS = [
  { name: 'Pure White', hex: '#ffffff', textHex: '#0f172a' },
  { name: 'Obsidian Noir', hex: '#0f172a', textHex: '#f8fafc' },
  { name: 'Korean Baby Pink', hex: '#fce7f3', textHex: '#831843' },
  { name: 'Aesthetic Lavender', hex: '#ede9fe', textHex: '#4c1d95' },
  { name: 'Vintage Cream', hex: '#fef3c7', textHex: '#78350f' },
  { name: 'Pastel Sky Blue', hex: '#e0f2fe', textHex: '#0369a1' },
  { name: 'Chartreuse Lime', hex: '#ecfccb', textHex: '#365314' },
  { name: 'MemoLab Blue', hex: '#164be4', textHex: '#ffffff' },
]

export const TemplateFrameView: FC = () => {
  // Mode: Catalog vs Builder
  const [activeTab, setActiveTab] = useState<'catalog' | 'builder'>('catalog')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [frameList, setFrameList] = useState<FrameItem[]>(INITIAL_FRAMES)
  const [builderToast, setBuilderToast] = useState<string | null>(null)

  // Builder Studio State
  const [builderFormat, setBuilderFormat] = useState<'Strip 2x6' | '4R Postcard' | 'Polaroid'>('Strip 2x6')
  const [builderSlots, setBuilderSlots] = useState<number>(4)
  const [builderBgColor, setBuilderBgColor] = useState<string>('#fce7f3')
  const [builderTextColor, setBuilderTextColor] = useState<string>('#831843')
  const [builderBgPattern, setBuilderBgPattern] = useState<'solid' | 'gradient' | 'dots' | 'grid'>('solid')
  const [builderHeaderText, setBuilderHeaderText] = useState<string>('MEMOLAB SNAP')
  const [builderHeaderFont, setBuilderHeaderFont] = useState<'sans' | 'serif' | 'display' | 'mono'>('sans')
  const [builderFooterCaption, setBuilderFooterCaption] = useState<string>('MEMOLAB MOMENTS')
  const [builderShowDate, setBuilderShowDate] = useState<boolean>(true)
  const [builderCornerRadius, setBuilderCornerRadius] = useState<number>(8)
  const [builderSlotBorder, setBuilderSlotBorder] = useState<'none' | 'white' | 'black' | 'dashed'>('none')
  const [builderActiveSticker, setBuilderActiveSticker] = useState<string>('✨')
  const [builderFrameName, setBuilderFrameName] = useState<string>('Custom Aesthetic Frame')
  const [builderPrice, setBuilderPrice] = useState<number>(35000)
  const [builderTag, setBuilderTag] = useState<string>('Custom Design')
  const [builderSectionTab, setBuilderSectionTab] = useState<'layout' | 'color' | 'typography' | 'stickers' | 'deploy'>('layout')

  const builderCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Filter for catalog tab
  const filtered = selectedCategory === 'All'
    ? frameList
    : frameList.filter((f) => f.category === selectedCategory)

  // Export Master High-Res PNG from Builder
  const handleExportBuilderPNG = () => {
    const canvas = builderCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isStrip = builderFormat === 'Strip 2x6'
    canvas.width = isStrip ? 600 : 1200
    canvas.height = 1800

    // Fill background
    ctx.fillStyle = builderBgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Pattern simulation if grid
    if (builderBgPattern === 'grid') {
      ctx.strokeStyle = 'rgba(0,0,0,0.06)'
      ctx.lineWidth = 2
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    // Top Brand Text
    ctx.fillStyle = builderTextColor
    ctx.font = builderHeaderFont === 'serif' ? 'bold 36px Georgia, serif' : '900 36px "Plus Jakarta Sans", sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(builderHeaderText, canvas.width / 2, 70)

    // Slot geometries (Transparent cutouts or photo placement)
    const padding = 36
    const availableHeight = canvas.height - 210
    const slotHeight = (availableHeight - padding * (builderSlots - 1)) / builderSlots
    const slotWidth = canvas.width - padding * 2

    for (let i = 0; i < builderSlots; i++) {
      const y = 105 + i * (slotHeight + padding)
      ctx.save()
      ctx.beginPath()
      ctx.roundRect(padding, y, slotWidth, slotHeight, builderCornerRadius * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      if (builderSlotBorder === 'black') {
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 4
        ctx.stroke()
      }
      ctx.restore()
    }

    // Footer text
    ctx.fillStyle = builderTextColor
    ctx.font = '600 20px "Plus Jakarta Sans", sans-serif'
    const dateStr = builderShowDate ? ` • ${new Date().toLocaleDateString('id-ID')}` : ''
    ctx.fillText(`${builderFooterCaption}${dateStr}`, canvas.width / 2, canvas.height - 45)

    const link = document.createElement('a')
    link.download = `${builderFrameName.replace(/\s+/g, '_')}_master.png`
    link.href = canvas.toDataURL('image/png')
    link.click()

    setBuilderToast('Master Frame PNG (300 DPI) berhasil diekspor!')
    setTimeout(() => setBuilderToast(null), 3500)
  }

  // Deploy newly built frame to Kiosk Fleet
  const handleDeployToKiosk = () => {
    const newFrame: FrameItem = {
      id: `frame-${Date.now()}`,
      name: builderFrameName || 'Template Frame Kustom',
      category: builderFormat,
      slots: builderSlots,
      price: builderPrice,
      activeOnBooths: 3,
      previewColor: 'from-blue-100 to-indigo-200',
      aspectRatio: builderFormat === 'Strip 2x6' ? 'aspect-[1/3]' : 'aspect-[3/2]',
      tags: [builderTag, 'Builder Studio', 'Baru'],
    }

    setFrameList([newFrame, ...frameList])
    setBuilderToast(`Frame "${newFrame.name}" berhasil dideploy ke 3 unit Kiosk MEMOLAB!`)
    setTimeout(() => {
      setBuilderToast(null)
      setActiveTab('catalog')
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Hidden Master Canvas for PNG Export */}
      <canvas ref={builderCanvasRef} className="hidden" />

      {/* Success Notification Toast */}
      {builderToast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{builderToast}</span>
          <button
            onClick={() => setBuilderToast(null)}
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Header & Tab Switcher Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Katalog Template ({frameList.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('builder')}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'builder'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wand2 className="w-4 h-4 text-amber-400" />
            <span>🎨 Frame Builder Studio</span>
          </button>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          {activeTab === 'catalog' ? (
            <>
              <button
                type="button"
                onClick={() => setActiveTab('builder')}
                className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Wand2 className="w-4 h-4 text-amber-300" />
                <span>Buka Frame Builder</span>
              </button>
              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
              >
                <ImageUp className="w-4 h-4" />
                <span>Upload PNG</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleExportBuilderPNG}
                className="flex items-center gap-2 text-xs font-bold px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export Master PNG</span>
              </button>
              <button
                type="button"
                onClick={handleDeployToKiosk}
                className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-[#ea580c] hover:bg-orange-700 text-white rounded-xl shadow-sm transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Deploy ke Kiosk</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ================= TAB 1: CATALOG VIEW ================= */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Sub Filters for Catalog */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Strip 2x6', '4R Postcard', 'Polaroid'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all cursor-pointer">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Urutkan Terpopuler</span>
            </button>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
            {filtered.map((frame) => (
              <div
                key={frame.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Visual Frame Mockup */}
                <div className={`p-4 bg-gradient-to-b ${frame.previewColor} flex items-center justify-center min-h-[220px] relative`}>
                  <div className="w-24 bg-white/95 rounded-lg p-1.5 shadow-md border border-black/10 flex flex-col gap-1.5">
                    {Array.from({ length: frame.slots }).map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-8 bg-slate-200/80 rounded flex items-center justify-center border border-dashed border-slate-300"
                      >
                        <span className="text-[8px] font-bold text-slate-400">Photo {i + 1}</span>
                      </div>
                    ))}
                    <div className="text-center pt-1">
                      <span className="text-[7px] font-black tracking-widest text-slate-400 uppercase">
                        MEMOLAB
                      </span>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white text-slate-900 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Frame Metadata */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      {frame.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs leading-snug">{frame.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {frame.category} • {frame.slots} Foto Slot
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Tarif Cetak</span>
                      <span className="text-xs font-black text-slate-900">
                        Rp {frame.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Check className="w-3 h-3" />
                      {frame.activeOnBooths} Booths
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 2: TEMPLATE FRAME BUILDER STUDIO ================= */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas Preview Panel (Col 5) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col items-center justify-between space-y-5">
            <div className="w-full flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Live Frame Simulator</span>
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Preview presisi tampilan cetak photo strip</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                {builderFormat} • {builderSlots} Slots
              </span>
            </div>

            {/* The Live Frame Rendering Box */}
            <div className="w-full flex justify-center py-2">
              <div
                style={{ backgroundColor: builderBgColor }}
                className={`${
                  builderFormat === 'Strip 2x6'
                    ? 'w-64 aspect-[1/3]'
                    : builderFormat === '4R Postcard'
                    ? 'w-80 aspect-[3/2]'
                    : 'w-72 aspect-[3/4]'
                } p-4 rounded-3xl border-2 border-slate-900 shadow-2xl flex flex-col justify-between transition-all relative overflow-hidden`}
              >
                {/* Background Pattern Simulation */}
                {builderBgPattern === 'grid' && (
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                )}

                {/* Top Logo / Brand Title */}
                <div className="text-center pb-2 relative z-10">
                  <span
                    style={{ color: builderTextColor }}
                    className={`text-xs tracking-widest uppercase block ${
                      builderHeaderFont === 'serif'
                        ? 'font-serif font-bold italic'
                        : builderHeaderFont === 'mono'
                        ? 'font-mono font-bold'
                        : 'font-black'
                    }`}
                  >
                    {builderHeaderText || 'MEMOLAB'}
                  </span>
                </div>

                {/* Slots with Realistic Placeholder Images */}
                <div
                  className={`relative z-10 flex-1 my-1.5 ${
                    builderFormat === '4R Postcard'
                      ? 'grid grid-cols-2 gap-2'
                      : 'flex flex-col gap-2 justify-between'
                  }`}
                >
                  {Array.from({ length: builderSlots }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        borderRadius: `${builderCornerRadius}px`,
                        border:
                          builderSlotBorder === 'black'
                            ? '2px solid #000'
                            : builderSlotBorder === 'white'
                            ? '2px solid #fff'
                            : builderSlotBorder === 'dashed'
                            ? '2px dashed #94a3b8'
                            : 'none',
                      }}
                      className="w-full aspect-[4/3] overflow-hidden bg-slate-200 relative shadow-inner"
                    >
                      <img
                        src={BUILDER_PLACEHOLDER_PHOTOS[i % BUILDER_PLACEHOLDER_PHOTOS.length]}
                        alt={`Slot ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Decorative sticker on slot 1 */}
                      {i === 0 && builderActiveSticker && (
                        <div className="absolute top-1.5 right-1.5 text-lg drop-shadow-md">
                          {builderActiveSticker}
                        </div>
                      )}
                      <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] font-bold px-1 rounded">
                        #{i + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer Caption & Date Stamp */}
                <div className="text-center pt-2 relative z-10">
                  <div
                    style={{ color: builderTextColor }}
                    className="text-[9px] font-bold tracking-wider"
                  >
                    {builderFooterCaption || 'MEMOLAB MOMENTS'}
                  </div>
                  {builderShowDate && (
                    <div
                      style={{ color: builderTextColor }}
                      className="text-[8px] opacity-70 mt-0.5"
                    >
                      {new Date().toLocaleDateString('id-ID')} • MEMOLAB FLEET
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick action buttons below simulator */}
            <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  setBuilderBgColor('#ffffff')
                  setBuilderTextColor('#0f172a')
                  setBuilderHeaderText('MEMOLAB SNAP')
                  setBuilderSlots(4)
                  setBuilderCornerRadius(8)
                  setBuilderActiveSticker('✨')
                }}
                className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default</span>
              </button>

              <button
                type="button"
                onClick={handleExportBuilderPNG}
                className="text-blue-600 font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Master (.PNG)</span>
              </button>
            </div>
          </div>

          {/* Right Configuration Controls (Col 7) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            {/* Builder Sub Tabs - 5-column grid (No scrollbar, zero cut-off) */}
            <div className="grid grid-cols-5 gap-1.5 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold">
              {[
                { id: 'layout', label: 'Layout', icon: LayoutGrid },
                { id: 'color', label: 'Warna', icon: Palette },
                { id: 'typography', label: 'Teks', icon: Type },
                { id: 'stickers', label: 'Stiker', icon: Sparkles },
                { id: 'deploy', label: 'Deploy', icon: Check },
              ].map((sTab) => {
                const Icon = sTab.icon
                const isActive = builderSectionTab === sTab.id
                return (
                  <button
                    key={sTab.id}
                    type="button"
                    onClick={() => setBuilderSectionTab(sTab.id as any)}
                    className={`py-2 px-1 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-sm font-black'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50 font-semibold'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="truncate">{sTab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* TAB 1: LAYOUT & FORMAT */}
            {builderSectionTab === 'layout' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-2">Format Dimensi Kertas</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'Strip 2x6', desc: 'Dual 2-inch Split Cut', icon: Columns },
                      { id: '4R Postcard', desc: '10 x 15 cm Full Sheet', icon: LayoutGrid },
                      { id: 'Polaroid', desc: 'Classic Square Card', icon: Square },
                    ].map((fmt) => {
                      const Icon = fmt.icon
                      const isSel = builderFormat === fmt.id
                      return (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => setBuilderFormat(fmt.id as any)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSel
                              ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mb-1.5 ${isSel ? 'text-blue-600' : 'text-slate-500'}`} />
                          <div className="font-bold text-xs text-slate-900">{fmt.id}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{fmt.desc}</div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Jumlah Slot Foto</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setBuilderSlots(num)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            builderSlots === num
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {num} Foto
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Border Slot Foto</label>
                    <select
                      value={builderSlotBorder}
                      onChange={(e) => setBuilderSlotBorder(e.target.value as any)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-white font-medium"
                    >
                      <option value="none">Tanpa Border (Clean)</option>
                      <option value="black">Border Hitam 2px (Neo)</option>
                      <option value="white">Border Putih 2px</option>
                      <option value="dashed">Border Garis Putus</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="slot-corner-radius" className="text-xs font-bold text-slate-800">Corner Radius Sudut Foto: {builderCornerRadius}px</label>
                    <span className="text-[11px] text-slate-400 font-medium">0px (Tegas) - 24px (Melengkung)</span>
                  </div>
                  <input
                    id="slot-corner-radius"
                    type="range"
                    min="0"
                    max="24"
                    value={builderCornerRadius}
                    onChange={(e) => setBuilderCornerRadius(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: WARNA & BACKGROUND */}
            {builderSectionTab === 'color' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-2">Preset Palet Tren Photobox</label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {BUILDER_COLOR_PRESETS.map((preset) => {
                      const isSel = builderBgColor.toLowerCase() === preset.hex.toLowerCase()
                      return (
                        <button
                          key={preset.hex}
                          type="button"
                          onClick={() => {
                            setBuilderBgColor(preset.hex)
                            setBuilderTextColor(preset.textHex)
                          }}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                            isSel
                              ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span
                            style={{ backgroundColor: preset.hex }}
                            className="w-6 h-6 rounded-lg border border-black/10 shadow-xs flex-shrink-0"
                          />
                          <span className="text-[11px] font-bold text-slate-800 truncate">{preset.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="custom-bg-color" className="text-xs font-bold text-slate-800 block mb-1.5">Kustom Warna Frame (HEX)</label>
                    <div className="flex items-center gap-2">
                      <input
                        id="custom-bg-color"
                        type="color"
                        value={builderBgColor}
                        onChange={(e) => setBuilderBgColor(e.target.value)}
                        className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={builderBgColor}
                        onChange={(e) => setBuilderBgColor(e.target.value)}
                        className="flex-1 text-xs p-2 rounded-xl border border-slate-200 font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="custom-text-color" className="text-xs font-bold text-slate-800 block mb-1.5">Warna Teks & Logo</label>
                    <div className="flex items-center gap-2">
                      <input
                        id="custom-text-color"
                        type="color"
                        value={builderTextColor}
                        onChange={(e) => setBuilderTextColor(e.target.value)}
                        className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={builderTextColor}
                        onChange={(e) => setBuilderTextColor(e.target.value)}
                        className="flex-1 text-xs p-2 rounded-xl border border-slate-200 font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">Tekstur Latar Belakang</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'solid', label: 'Warna Polos Solid' },
                      { id: 'grid', label: 'Y2K Grid Wireframe' },
                      { id: 'gradient', label: 'Soft Gradient' },
                    ].map((pat) => (
                      <button
                        key={pat.id}
                        type="button"
                        onClick={() => setBuilderBgPattern(pat.id as any)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          builderBgPattern === pat.id
                            ? 'bg-blue-50 border-blue-600 text-blue-700'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {pat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TYPOGRAPHY & HEADER/FOOTER */}
            {builderSectionTab === 'typography' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">Teks Header / Brand Logo Atas</label>
                  <input
                    type="text"
                    value={builderHeaderText}
                    onChange={(e) => setBuilderHeaderText(e.target.value)}
                    maxLength={24}
                    placeholder="Contoh: MEMOLAB SNAP / SARAH & BUDI"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">Gaya Tipografi Font Header</label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {[
                      { id: 'sans', label: 'Modern Sans', style: 'font-sans font-black' },
                      { id: 'serif', label: 'Vintage Serif', style: 'font-serif italic font-bold' },
                      { id: 'display', label: 'Bold Display', style: 'tracking-widest font-black' },
                      { id: 'mono', label: 'Monospace Code', style: 'font-mono font-bold' },
                    ].map((fnt) => (
                      <button
                        key={fnt.id}
                        type="button"
                        onClick={() => setBuilderHeaderFont(fnt.id as any)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          builderHeaderFont === fnt.id
                            ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`text-xs ${fnt.style}`}>{fnt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Teks Caption Footer</label>
                    <input
                      type="text"
                      value={builderFooterCaption}
                      onChange={(e) => setBuilderFooterCaption(e.target.value)}
                      maxLength={28}
                      placeholder="Contoh: Best Friends Forever"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Stempel Tanggal Otomatis</label>
                    <button
                      type="button"
                      onClick={() => setBuilderShowDate(!builderShowDate)}
                      className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        builderShowDate
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{builderShowDate ? 'Aktif (Tanggal Hari Ini)' : 'Nonaktif'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: STICKERS & WATERMARK */}
            {builderSectionTab === 'stickers' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-2">Pilihan Stiker Dekorasi di Frame</label>
                  <div className="flex flex-wrap gap-3">
                    {['✨', '💖', '⭐', '🌸', '😊', '🎀', '🍒', '🔥', '⚡', ''].map((st, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setBuilderActiveSticker(st)}
                        className={`w-12 h-12 rounded-2xl border text-xl flex items-center justify-center transition-all cursor-pointer ${
                          builderActiveSticker === st
                            ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {st || <span className="text-xs font-bold text-slate-400">Off</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Stiker Otomatis Terpasang</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Stiker yang dipilih akan dirender permanen di sudut frame foto pengunjung saat dicetak di mesin booth.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 5: DEPLOY KE KIOSK */}
            {builderSectionTab === 'deploy' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Nama Template Frame</label>
                    <input
                      type="text"
                      value={builderFrameName}
                      onChange={(e) => setBuilderFrameName(e.target.value)}
                      placeholder="Contoh: Korean Romantic Pink"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-semibold focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1.5">Tarif Cetak di Mesin (Rp)</label>
                    <input
                      type="number"
                      step={5000}
                      value={builderPrice}
                      onChange={(e) => setBuilderPrice(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-bold focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1.5">Tag Kategori / Badge</label>
                  <div className="flex gap-2">
                    {['Korean', 'Trending', 'Best Seller', 'Romantic', 'Y2K Retro'].map((tg) => (
                      <button
                        key={tg}
                        type="button"
                        onClick={() => setBuilderTag(tg)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          builderTag === tg
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {tg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Big Action Box */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDeployToKiosk}
                    className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-[#ea580c] hover:bg-orange-700 text-white font-black text-xs shadow-md shadow-orange-950/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Deploy ke Semua Mesin Kiosk (3 Unit)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportBuilderPNG}
                    className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Master PNG</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Frame Modal (Old Upload fallback) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ImageUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Upload Overlay Frame</h3>
                  <p className="text-xs text-slate-500">Gunakan file PNG transparan resolusi tinggi (300 DPI)</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 my-5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nama Template Frame</label>
                <input
                  type="text"
                  placeholder="Contoh: Y2K Hologram Edition"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Kategori Dimensi</label>
                  <select className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-white">
                    <option>Strip 2x6 (Dual Cut)</option>
                    <option>4R Full Postcard</option>
                    <option>Square Polaroid</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Jumlah Slot Foto</label>
                  <select className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none bg-white">
                    <option>4 Foto Slot</option>
                    <option>3 Foto Slot</option>
                    <option>2 Foto Slot</option>
                    <option>1 Foto Slot</option>
                  </select>
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-blue-50/20 transition-all cursor-pointer">
                <ImageUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800">Klik untuk upload atau drag and drop</p>
                <p className="text-[11px] text-slate-500 mt-1">PNG transparansi penuh (1200 x 1800 px untuk 4R / 600 x 1800 px untuk strip)</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setFrameList([
                    {
                      id: `frame-${Date.now()}`,
                      name: 'Frame Baru Kustom',
                      category: 'Strip 2x6',
                      slots: 4,
                      price: 35000,
                      activeOnBooths: 3,
                      previewColor: 'from-cyan-100 to-blue-200',
                      aspectRatio: 'aspect-[1/3]',
                      tags: ['Baru'],
                    },
                    ...frameList,
                  ])
                  setShowUploadModal(false)
                }}
                className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm cursor-pointer"
              >
                Simpan & Deploy ke Kiosk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
