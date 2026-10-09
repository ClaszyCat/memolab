import { useState, useRef, useEffect } from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  Camera,
  RotateCcw,
  Sparkles,
  QrCode,
  Check,
  ChevronRight,
  Download,
  ArrowLeft,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ArrowLeftRight,
  ZoomIn,
  ZoomOut,
  Clock,
} from 'lucide-react'

// Product Catalog Item
interface ProductItem {
  id: string
  title: string
  category: 'Collage' | 'Photo Strip' | 'ID Photo' | 'Studio'
  slots: number
  shots: number
  prints: string
  price: number
  badge?: string
  sampleGradient: string
  slotAspect: number // width / height
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'strip-classic',
    title: 'Photo Strip Classic (4 Cut)',
    category: 'Photo Strip',
    slots: 4,
    shots: 8,
    prints: '2pcs print Strip 2x6',
    price: 35000,
    badge: 'BEST SELLER',
    sampleGradient: 'from-pink-400 via-rose-300 to-amber-200',
    slotAspect: 4 / 3, // standard 4:3 camera ratio
  },
  {
    id: 'collage-a',
    title: 'Collage A (4 Grid)',
    category: 'Collage',
    slots: 4,
    shots: 8,
    prints: '1pcs print 4R, Soft copy',
    price: 45000,
    badge: 'POPULAR',
    sampleGradient: 'from-blue-400 via-indigo-300 to-emerald-200',
    slotAspect: 4 / 3,
  },
  {
    id: 'strip-trio',
    title: 'Photo Strip Trio (3 Cut)',
    category: 'Photo Strip',
    slots: 3,
    shots: 6,
    prints: '2pcs print Strip 2x6',
    price: 35000,
    sampleGradient: 'from-purple-400 via-pink-300 to-sky-200',
    slotAspect: 4 / 3,
  },
  {
    id: 'polaroid-duo',
    title: 'Polaroid Square Duo',
    category: 'Collage',
    slots: 2,
    shots: 6,
    prints: '2pcs print Polaroid',
    price: 40000,
    sampleGradient: 'from-amber-300 via-orange-300 to-rose-300',
    slotAspect: 1, // square
  },
  {
    id: 'id-photo-pro',
    title: 'ID Photo Pass (4x6 cm)',
    category: 'ID Photo',
    slots: 4,
    shots: 4,
    prints: '4pcs print ID Card size',
    price: 30000,
    sampleGradient: 'from-sky-400 via-blue-300 to-indigo-300',
    slotAspect: 3 / 4,
  },
  {
    id: 'studio-portrait',
    title: 'Studio Portrait Hero 4R',
    category: 'Studio',
    slots: 1,
    shots: 6,
    prints: '2pcs print 4R Full Card',
    price: 50000,
    badge: 'PREMIUM',
    sampleGradient: 'from-teal-300 via-emerald-300 to-lime-200',
    slotAspect: 3 / 2,
  },
]

// Frame design templates
interface FrameDesign {
  id: string
  name: string
  themeCategory: 'Kpop Fans' | 'Y2K Aesthetic' | 'Dreamy & Tasty' | 'Minimalist'
  bgHex: string
  textColor: string
  textHex: string
  borderStyle: string
  decorativePattern?: string
  previewThumb: string
}

const FRAME_DESIGNS: FrameDesign[] = [
  {
    id: 'kpop-pastel',
    name: 'K-Pop Pastel Lavender',
    themeCategory: 'Kpop Fans',
    bgHex: '#f3e8ff',
    textColor: 'text-purple-950',
    textHex: '#3b0764',
    borderStyle: 'border-purple-300',
    previewThumb: 'bg-purple-100',
  },
  {
    id: 'y2k-cyber-black',
    name: 'Y2K Cyber Star Noir',
    themeCategory: 'Y2K Aesthetic',
    bgHex: '#090d16',
    textColor: 'text-lime-400',
    textHex: '#a3e635',
    borderStyle: 'border-lime-400',
    previewThumb: 'bg-slate-900',
  },
  {
    id: 'dreamy-pink',
    name: 'Dreamy Strawberry Cream',
    themeCategory: 'Dreamy & Tasty',
    bgHex: '#ffe4e6',
    textColor: 'text-rose-900',
    textHex: '#881337',
    borderStyle: 'border-rose-300',
    previewThumb: 'bg-rose-100',
  },
  {
    id: 'minimal-clean-white',
    name: 'Minimalist Clean White',
    themeCategory: 'Minimalist',
    bgHex: '#ffffff',
    textColor: 'text-slate-900',
    textHex: '#0f172a',
    borderStyle: 'border-slate-300',
    previewThumb: 'bg-white',
  },
  {
    id: 'lime-pop',
    name: 'Chartreuse Lime Pop',
    themeCategory: 'Y2K Aesthetic',
    bgHex: '#ecfccb',
    textColor: 'text-lime-950',
    textHex: '#1a2e05',
    borderStyle: 'border-lime-400',
    previewThumb: 'bg-lime-100',
  },
  {
    id: 'denim-blue',
    name: 'Vintage Denim Blue',
    themeCategory: 'Kpop Fans',
    bgHex: '#dbeafe',
    textColor: 'text-blue-950',
    textHex: '#172554',
    borderStyle: 'border-blue-300',
    previewThumb: 'bg-blue-100',
  },
]

// Filter presets
interface FilterPreset {
  id: string
  name: string
  cssFilter: string
  canvasFilter: string
}

const FILTER_PRESETS: FilterPreset[] = [
  { id: 'normal', name: 'Original', cssFilter: 'none', canvasFilter: 'none' },
  {
    id: 'natural',
    name: 'Natural Glow',
    cssFilter: 'brightness(1.06) contrast(1.04) saturate(1.12)',
    canvasFilter: 'brightness(1.06) contrast(1.04) saturate(1.12)',
  },
  {
    id: 'noir',
    name: 'B&W Film',
    cssFilter: 'grayscale(100%) contrast(1.2) brightness(0.96)',
    canvasFilter: 'grayscale(100%) contrast(1.2) brightness(0.96)',
  },
  {
    id: 'y2k',
    name: 'Y2K Warmth',
    cssFilter: 'sepia(20%) saturate(1.2) hue-rotate(-8deg) brightness(1.04)',
    canvasFilter: 'sepia(20%) saturate(1.2) hue-rotate(-8deg) brightness(1.04)',
  },
  {
    id: 'cyber',
    name: 'Cyber Cool',
    cssFilter: 'contrast(1.15) hue-rotate(160deg) saturate(1.25)',
    canvasFilter: 'contrast(1.15) hue-rotate(160deg) saturate(1.25)',
  },
  {
    id: 'film',
    name: '90s Grain',
    cssFilter: 'sepia(30%) contrast(0.95) brightness(1.04) saturate(0.9)',
    canvasFilter: 'sepia(30%) contrast(0.95) brightness(1.04) saturate(0.9)',
  },
]

// Individual photo transformation parameters (prevent squishing / cutting)
interface PhotoAdjustment {
  zoom: number // 1.0 is default, 0.85 is fit out, 1.2 is zoom in
  panY: number // vertical offset in percentage (-30% to +30%)
}

// Fallback high-res photos
const SAMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80',
]

// Stickers collection
const STICKER_LIST = [
  { id: 'glasses', label: '👓 Kacamata' },
  { id: 'ribbon', label: '🎀 Pita' },
  { id: 'sparkle', label: '✨ Sparkle' },
  { id: 'heart', label: '💖 Love' },
  { id: 'star', label: '⭐ Bintang' },
  { id: 'smile', label: '😊 Smiley' },
  { id: 'flower', label: '🌸 Bunga' },
  { id: 'fire', label: '🔥 Fire' },
]

type StepType =
  | 'welcome'
  | 'catalog'
  | 'select-frame'
  | 'camera'
  | 'review-done'
  | 'payment'
  | 'success-modal'

export const PhotoboothPage: FC = () => {
  // Navigation / Step
  const [currentStep, setCurrentStep] = useState<StepType>('welcome')

  // Catalog & Frame State
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(PRODUCTS[0])
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string>('Photo Strip')
  const [selectedFrame, setSelectedFrame] = useState<FrameDesign>(FRAME_DESIGNS[0])
  const [selectedThemeCategory, setSelectedThemeCategory] = useState<string>('Kpop Fans')
  const [selectedFilter, setSelectedFilter] = useState<FilterPreset>(FILTER_PRESETS[1])
  const [customCaption, setCustomCaption] = useState<string>('GOOD VIBES ONLY')
  const [activeSticker, setActiveSticker] = useState<string>('✨')
  const [activeStickerTab, setActiveStickerTab] = useState<'image' | 'text'>('image')

  // Photos & Transformations
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([])
  const [photoAdjustments, setPhotoAdjustments] = useState<PhotoAdjustment[]>([])
  const [currentShotIndex, setCurrentShotIndex] = useState(0)

  // Camera & Capture
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [showFlash, setShowFlash] = useState(false)

  // Swap / Reorder
  const [swapSourceIndex, setSwapSourceIndex] = useState<number | null>(null)
  const [swapToast, setSwapToast] = useState<string | null>(null)

  // Timer simulation (07:45)
  const [sessionSeconds, setSessionSeconds] = useState(465) // 07:45
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Audio Beep
  const playBeep = (freq = 700, duration = 0.1) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.connect(gain)
      gain.connect(audioCtx.destination)
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration)
      osc.start(audioCtx.currentTime)
      osc.stop(audioCtx.currentTime + duration)
    } catch {}
  }

  // Timer Tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Initialize photo adjustments when slots change
  useEffect(() => {
    if (photoAdjustments.length !== selectedProduct.slots) {
      setPhotoAdjustments(
        Array.from({ length: selectedProduct.slots }, () => ({
          zoom: 1.0,
          panY: 0,
        }))
      )
    }
  }, [selectedProduct.slots])

  // Camera stream activation
  useEffect(() => {
    let stream: MediaStream | null = null

    if (currentStep === 'camera') {
      navigator.mediaDevices
        ?.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        })
        .then((s) => {
          stream = s
          if (videoRef.current) {
            videoRef.current.srcObject = s
            videoRef.current.play()
          }
          setCameraActive(true)
        })
        .catch(() => {
          setCameraActive(false)
        })
    } else {
      setCameraActive(false)
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [currentStep])

  // Countdown timer for taking photo
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (countdown !== null && countdown > 0) {
      playBeep(850, 0.12)
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      playBeep(1200, 0.25)
      triggerCapture()
      setCountdown(null)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  // Capture Single Photo
  const triggerCapture = () => {
    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 200)

    let photoUrl = ''
    if (videoRef.current && cameraActive) {
      const v = videoRef.current
      const c = document.createElement('canvas')
      c.width = v.videoWidth || 1280
      c.height = v.videoHeight || 720
      const ctx = c.getContext('2d')
      if (ctx) {
        // Mirror horizontally
        ctx.translate(c.width, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(v, 0, 0, c.width, c.height)
        photoUrl = c.toDataURL('image/jpeg', 0.95)
      }
    } else {
      // Fallback sample photo
      photoUrl = SAMPLE_PHOTOS[currentShotIndex % SAMPLE_PHOTOS.length]
    }

    const updated = [...capturedPhotos]
    updated[currentShotIndex] = photoUrl
    setCapturedPhotos(updated)

    if (currentShotIndex + 1 < selectedProduct.slots) {
      setCurrentShotIndex(currentShotIndex + 1)
    } else {
      setTimeout(() => {
        setCurrentStep('review-done')
      }, 500)
    }
  }

  // Swap Handler
  const handleSwapClick = (idx: number) => {
    if (swapSourceIndex === null) {
      setSwapSourceIndex(idx)
      setSwapToast(`Slot #${idx + 1} dipilih. Klik slot lain untuk menukar.`)
    } else if (swapSourceIndex === idx) {
      setSwapSourceIndex(null)
      setSwapToast(null)
    } else {
      const newPhotos = [...capturedPhotos]
      const tempP = newPhotos[swapSourceIndex]
      newPhotos[swapSourceIndex] = newPhotos[idx]
      newPhotos[idx] = tempP
      setCapturedPhotos(newPhotos)

      // Also swap adjustments
      const newAdj = [...photoAdjustments]
      const tempA = newAdj[swapSourceIndex]
      newAdj[swapSourceIndex] = newAdj[idx]
      newAdj[idx] = tempA
      setPhotoAdjustments(newAdj)

      setSwapToast(`Foto #${swapSourceIndex + 1} dan #${idx + 1} berhasil ditukar!`)
      setSwapSourceIndex(null)
      setTimeout(() => setSwapToast(null), 2500)
    }
  }

  // Move Up / Down
  const handleMovePhoto = (fromIdx: number, direction: 'up' | 'down') => {
    const toIdx = direction === 'up' ? fromIdx - 1 : fromIdx + 1
    if (toIdx < 0 || toIdx >= capturedPhotos.length) return
    const newPhotos = [...capturedPhotos]
    const tempP = newPhotos[fromIdx]
    newPhotos[fromIdx] = newPhotos[toIdx]
    newPhotos[toIdx] = tempP
    setCapturedPhotos(newPhotos)

    const newAdj = [...photoAdjustments]
    const tempA = newAdj[fromIdx]
    newAdj[fromIdx] = newAdj[toIdx]
    newAdj[toIdx] = tempA
    setPhotoAdjustments(newAdj)
  }

  // Adjust Zoom (+ / -) to prevent squish / cut
  const handleAdjustZoom = (idx: number, delta: number) => {
    const newAdj = [...photoAdjustments]
    const current = newAdj[idx]?.zoom || 1.0
    const nextZoom = Math.min(1.4, Math.max(0.85, Number((current + delta).toFixed(2))))
    newAdj[idx] = { ...newAdj[idx], zoom: nextZoom }
    setPhotoAdjustments(newAdj)
  }

  // Adjust Pan Y (Up / Down)
  const handleAdjustPanY = (idx: number, delta: number) => {
    const newAdj = [...photoAdjustments]
    const current = newAdj[idx]?.panY || 0
    const nextPan = Math.min(25, Math.max(-25, current + delta))
    newAdj[idx] = { ...newAdj[idx], panY: nextPan }
    setPhotoAdjustments(newAdj)
  }

  // Download Rendered PNG with PROPER COVER & ZOOM (ANTI GEPENG, NO UNWANTED CUTTING)
  const handleDownloadRenderedStrip = () => {
    const c = canvasRef.current
    if (!c) return

    const link = document.createElement('a')
    link.download = `MEMOLAB_SNAP_${selectedProduct.id}_${Date.now()}.png`
    link.href = c.toDataURL('image/png', 1.0)
    link.click()
  }

  // Draw on Canvas for PNG generation
  useEffect(() => {
    if (currentStep === 'review-done' || currentStep === 'payment' || currentStep === 'success-modal') {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const isStrip = selectedProduct.category === 'Photo Strip'
      canvas.width = isStrip ? 600 : 1200
      canvas.height = 1800

      // Fill background
      ctx.fillStyle = selectedFrame.bgHex
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Top brand header
      ctx.fillStyle = selectedFrame.textHex
      ctx.font = '900 38px "Plus Jakarta Sans", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('MEMOLAB SNAP', canvas.width / 2, 75)

      // Slot calculation for Strip or Grid
      const isGrid = selectedProduct.category === 'Collage' || selectedProduct.category === 'ID Photo'
      const padding = 36

      let loadedCount = 0
      capturedPhotos.forEach((src, idx) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = src
        img.onload = () => {
          let slotX = padding
          let slotY = 105
          let slotWidth = canvas.width - padding * 2
          let slotHeight = (canvas.height - 210 - padding * (selectedProduct.slots - 1)) / selectedProduct.slots

          if (isGrid) {
            const col = idx % 2
            const row = Math.floor(idx / 2)
            const gap = 24
            slotWidth = (canvas.width - padding * 2 - gap) / 2
            slotHeight = (canvas.height - 240 - gap) / 2
            slotX = padding + col * (slotWidth + gap)
            slotY = 120 + row * (slotHeight + gap)
          } else {
            slotY = 105 + idx * (slotHeight + padding)
          }

          ctx.save()
          // Clip to slot rectangle with slight rounded corners
          ctx.beginPath()
          ctx.roundRect(slotX, slotY, slotWidth, slotHeight, 14)
          ctx.clip()

          // Filter
          if (selectedFilter.canvasFilter && selectedFilter.canvasFilter !== 'none') {
            ctx.filter = selectedFilter.canvasFilter
          }

          // Cover crop math with user-defined zoom and pan
          const adj = photoAdjustments[idx] || { zoom: 1.0, panY: 0 }
          const imgW = img.naturalWidth || img.width
          const imgH = img.naturalHeight || img.height
          const targetRatio = slotWidth / slotHeight
          const imgRatio = imgW / imgH

          let sW = imgW
          let sH = imgH
          let sX = 0
          let sY = 0

          if (imgRatio > targetRatio) {
            sW = imgH * targetRatio
            sX = (imgW - sW) / 2
          } else {
            sH = imgW / targetRatio
            sY = (imgH - sH) / 2
          }

          // Apply user zoom and vertical pan
          const zoomedW = sW / adj.zoom
          const zoomedH = sH / adj.zoom
          const panOffset = (imgH * adj.panY) / 100

          const finalSX = Math.max(0, sX + (sW - zoomedW) / 2)
          const finalSY = Math.max(0, sY + (sH - zoomedH) / 2 + panOffset)

          ctx.drawImage(img, finalSX, finalSY, zoomedW, zoomedH, slotX, slotY, slotWidth, slotHeight)
          ctx.restore()

          // Sticker
          if (idx === 0 && activeSticker) {
            ctx.font = '40px sans-serif'
            ctx.fillText(activeSticker, slotX + slotWidth - 45, slotY + 55)
          }

          loadedCount++
          if (loadedCount === capturedPhotos.length) {
            // Draw footer stamp
            ctx.fillStyle = selectedFrame.textHex
            ctx.font = '700 22px "Plus Jakarta Sans", sans-serif'
            ctx.textAlign = 'center'
            const dateStr = new Date().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            })
            ctx.fillText(
              `${customCaption} • ${dateStr}`,
              canvas.width / 2,
              canvas.height - 45
            )
          }
        }
      })
    }
  }, [
    currentStep,
    capturedPhotos,
    photoAdjustments,
    selectedFrame,
    selectedFilter,
    customCaption,
    selectedProduct,
    activeSticker,
  ])

  return (
    <div className="h-screen w-screen bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif] text-slate-900 flex flex-col select-none overflow-hidden relative">
      {/* Hidden high-res canvas for PNG generation */}
      <canvas ref={canvasRef} className="hidden" />

      {/* White camera flash */}
      {showFlash && (
        <div className="fixed inset-0 z-50 bg-white pointer-events-none animate-out fade-out duration-300" />
      )}

      {/* Toast Alert */}
      {swapToast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white px-5 py-2.5 rounded-full shadow-2xl border-2 border-slate-800 text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <ArrowLeftRight className="w-4 h-4 text-lime-400" />
          <span>{swapToast}</span>
        </div>
      )}

      {/* Top Checkerboard / Diagonal Ribbon Header Bar - Full Bleed Edge to Edge */}
      <div className="h-4 w-full bg-[repeating-linear-gradient(45deg,#2563eb,#2563eb_12px,#a3e635_12px,#a3e635_24px)] border-b-2 border-slate-950 shrink-0" />

      {/* Sub Header Bar with Breadcrumbs & Timer - Full Bleed Edge to Edge */}
      <div className="px-8 py-3.5 border-b-2 border-slate-950 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            {currentStep !== 'welcome' && (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 'catalog') setCurrentStep('welcome')
                  else if (currentStep === 'select-frame') setCurrentStep('catalog')
                  else if (currentStep === 'camera') setCurrentStep('select-frame')
                  else if (currentStep === 'review-done') setCurrentStep('camera')
                  else if (currentStep === 'payment') setCurrentStep('review-done')
                  else if (currentStep === 'success-modal') setCurrentStep('welcome')
                }}
                className="w-9 h-9 rounded-full border-2 border-slate-950 bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <Link to="/report-analytic" className="flex items-center gap-2 no-underline">
              <span className="font-black text-xl tracking-tight text-slate-950">
                MEMOLAB <span className="text-[#2563eb] text-sm uppercase font-black">SNAP</span>
              </span>
            </Link>
          </div>

          {/* Stepper Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-black">
            <span
              className={`px-3 py-1 rounded-full border-2 border-slate-950 ${
                currentStep === 'catalog' || currentStep === 'select-frame'
                  ? 'bg-lime-300 text-slate-950'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              1. Choose
            </span>
            <span
              className={`px-3 py-1 rounded-full border-2 border-slate-950 ${
                currentStep === 'camera'
                  ? 'bg-lime-300 text-slate-950'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              2. Shoot
            </span>
            <span
              className={`px-3 py-1 rounded-full border-2 border-slate-950 ${
                currentStep === 'review-done'
                  ? 'bg-lime-300 text-slate-950'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              3. Review & Edit
            </span>
            <span
              className={`px-3 py-1 rounded-full border-2 border-slate-950 ${
                currentStep === 'payment' || currentStep === 'success-modal'
                  ? 'bg-lime-300 text-slate-950'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              4. Print
            </span>
          </div>

          {/* Timer Badge (Pink/Coral Pill exactly like reference 07:45) */}
          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-full bg-rose-500 text-white font-mono font-black text-xs border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTimer(sessionSeconds)}</span>
            </div>

            <Link
              to="/report-analytic"
              className="text-xs font-bold text-slate-500 hover:text-slate-900 ml-2 hidden lg:inline"
            >
              Exit
            </Link>
          </div>
        </div>

        {/* KIOSK MAIN CONTENT ROUTER - Single Viewport Screen (No Outer Scrollbar) */}
        <div className="w-full flex-1 flex flex-col justify-center items-center overflow-hidden p-3 sm:p-5">
          {/* ================= 1. WELCOME ATTRACT SCREEN ================= */}
          {currentStep === 'welcome' && (
            <div className="max-w-5xl w-full mx-auto space-y-6 my-auto animate-in fade-in duration-200">
              {/* Pop Hero Card with Lime Green & Checkerboard flair */}
              <div className="bg-[#bef264] rounded-[32px] border-[3px] border-slate-950 p-8 sm:p-12 relative overflow-hidden shadow-[7px_7px_0px_0px_rgba(15,23,42,1)] flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Decorative Y2K Checkerboard corner */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[repeating-linear-gradient(45deg,#2563eb,#2563eb_12px,#a3e635_12px,#a3e635_24px)] rounded-full border-2 border-slate-950 opacity-90 pointer-events-none" />

                <div className="space-y-4 max-w-md relative z-10 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-slate-950 text-xs font-black shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" />
                    <span>Special Offers & News</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-black text-slate-950 leading-[1.1] tracking-tight">
                    WELCOME <br />
                    <span className="text-white drop-shadow-[3px_3px_0px_rgba(15,23,42,1)]">
                      to MEMOLAB
                    </span>{' '}
                    <span className="bg-[#2563eb] text-white px-2.5 py-0.5 rounded-xl border-[2.5px] border-slate-950 inline-block rotate-[-2deg] shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                      SNAP
                    </span>
                  </h1>

                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed bg-white/85 p-3 rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    The No.1 Choice for Picture-Perfect Moments! Foto aesthetic ala Korean Photobox dengan filter jernih & cetak instan DNP.
                  </p>
                </div>

                {/* Promo Card Banner */}
                <div className="bg-white rounded-3xl border-[3px] border-slate-950 p-5 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] max-w-xs w-full text-center space-y-3 relative z-10 rotate-1">
                  <span className="text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-700 px-3 py-1 rounded-full border-2 border-rose-300">
                    Photobox Studio
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-950">
                    Discount up to <br />
                    <span className="text-rose-600 text-4xl sm:text-5xl">70%</span>
                  </div>
                  <p className="text-xs font-bold text-slate-600">Auto Print 2x Strip DNP Sublimasi</p>
                </div>
              </div>

              {/* Action Buttons Section: "WHAT YOU WANT TO DO?" */}
              <div className="text-center space-y-4">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-800">
                  WHAT YOU WANT TO DO?
                </h3>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('catalog')}
                    className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-[#2563eb] hover:bg-blue-700 active:translate-x-0.5 active:translate-y-0.5 text-white font-black text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Order / Foto</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCapturedPhotos(SAMPLE_PHOTOS)
                      setCurrentStep('review-done')
                    }}
                    className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-[#ea580c] hover:bg-orange-700 active:translate-x-0.5 active:translate-y-0.5 text-white font-black text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Edit Photo Studio</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. ALL PRODUCT CATALOG ================= */}
          {currentStep === 'catalog' && (
            <div className="max-w-7xl w-full mx-auto space-y-8 animate-in fade-in duration-200">
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight">
                  ALL PRODUCT
                </h2>
                <p className="text-sm text-slate-600 font-bold mt-1">
                  Pilih paket format cetak photobox yang kamu inginkan
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left Category Sidebar Pills */}
                <div className="w-full md:w-56 flex md:flex-col gap-2.5 flex-wrap">
                  <span className="text-xs font-black uppercase text-slate-400 block mb-1">
                    CATEGORIES
                  </span>
                  {(['Photo Strip', 'Collage', 'ID Photo', 'Studio'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCatalogCategory(cat)}
                      className={`w-full py-3.5 px-5 rounded-2xl text-sm font-black border-2 border-slate-950 text-left transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                        selectedCatalogCategory === cat
                          ? 'bg-slate-950 text-white'
                          : 'bg-white text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Right Product Grid Cards */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRODUCTS.filter(
                    (p) =>
                      selectedCatalogCategory === 'All' || p.category === selectedCatalogCategory
                  ).map((prod) => {
                    const isSelected = selectedProduct.id === prod.id
                    return (
                      <div
                        key={prod.id}
                        onClick={() => setSelectedProduct(prod)}
                        className={`bg-white rounded-3xl border-[2.5px] border-slate-950 p-5 transition-all cursor-pointer flex flex-col justify-between group shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:scale-[1.01] ${
                          isSelected ? 'ring-4 ring-lime-400 bg-lime-50/40' : ''
                        }`}
                      >
                        <div>
                          {/* Visual Product Mockup */}
                          <div
                            className={`h-44 rounded-2xl bg-gradient-to-br ${prod.sampleGradient} border-2 border-slate-950 p-3 mb-4 flex items-center justify-center relative overflow-hidden shadow-inner`}
                          >
                            {prod.badge && (
                              <span className="absolute top-2.5 left-2.5 bg-slate-950 text-lime-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-lime-400 shadow-sm">
                                {prod.badge}
                              </span>
                            )}
                            <div className="w-20 h-36 bg-white/95 rounded-xl border-2 border-slate-950 p-1.5 flex flex-col gap-1.5 shadow-md">
                              {Array.from({ length: prod.slots }).map((_, i) => (
                                <div key={i} className="flex-1 bg-slate-200 rounded-xs" />
                              ))}
                              <div className="text-[6px] text-center font-black">MEMOLAB</div>
                            </div>
                          </div>

                          <h4 className="font-black text-base text-slate-950">{prod.title}</h4>
                          <p className="text-xs font-bold text-slate-500 mt-1">
                            {prod.shots}x Shoot, {prod.prints}
                          </p>
                        </div>

                        <div className="pt-4 border-t-2 border-slate-950 mt-4 flex items-center justify-between">
                          <span className="text-base font-black text-rose-600">
                            Rp {prod.price.toLocaleString('id-ID')}
                          </span>
                          <span className="text-xs font-black bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-950">
                            {prod.slots} Slots
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep('select-frame')}
                  className="py-4 px-10 rounded-2xl bg-[#ea580c] hover:bg-orange-700 text-white font-black text-base border-2 border-slate-950 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Lanjut Pilih Frame</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* ================= 3. SELECT FRAME ================= */}
          {currentStep === 'select-frame' && (
            <div className="max-w-7xl w-full mx-auto space-y-8 animate-in fade-in duration-200">
              <div className="text-center">
                <h2 className="text-4xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight">
                  SELECT FRAME DESIGN
                </h2>
                <p className="text-sm font-bold text-slate-600 mt-1">
                  Pilih desain tema bingkai foto untuk {selectedProduct.title}
                </p>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left Theme categories & filter */}
                <div className="w-full lg:w-56 space-y-2.5">
                  <span className="text-xs font-black uppercase text-slate-400 block mb-1">
                    FRAME THEMES
                  </span>
                  {(['Kpop Fans', 'Y2K Aesthetic', 'Dreamy & Tasty', 'Minimalist'] as const).map(
                    (th) => (
                      <button
                        key={th}
                        type="button"
                        onClick={() => setSelectedThemeCategory(th)}
                        className={`w-full py-3 px-5 rounded-2xl text-xs font-black border-2 border-slate-950 text-left transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                          selectedThemeCategory === th
                            ? 'bg-slate-950 text-white'
                            : 'bg-white text-slate-800 hover:bg-slate-100'
                        }`}
                      >
                        {th}
                      </button>
                    )
                  )}
                </div>

                {/* Center Frame Grid */}
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {FRAME_DESIGNS.filter(
                    (f) =>
                      selectedThemeCategory === 'All' || f.themeCategory === selectedThemeCategory
                  ).map((fd) => {
                    const isSelected = selectedFrame.id === fd.id
                    return (
                      <div
                        key={fd.id}
                        onClick={() => setSelectedFrame(fd)}
                        className={`bg-white rounded-3xl border-[2.5px] border-slate-950 p-4 transition-all cursor-pointer flex flex-col justify-between shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] hover:scale-[1.01] ${
                          isSelected ? 'ring-4 ring-lime-400 bg-lime-50/40' : ''
                        }`}
                      >
                        <div
                          style={{ backgroundColor: fd.bgHex }}
                          className="h-44 rounded-2xl border-2 border-slate-950 p-3 flex flex-col justify-between mb-3 shadow-inner"
                        >
                          <span className={`text-[10px] font-black uppercase ${fd.textColor}`}>
                            MEMOLAB
                          </span>
                          <div className="space-y-1.5">
                            <div className="w-full h-5 bg-black/10 rounded-xs" />
                            <div className="w-full h-5 bg-black/10 rounded-xs" />
                          </div>
                          <span className={`text-[9px] font-bold ${fd.textColor}`}>
                            Good Vibes Only
                          </span>
                        </div>
                        <span className="font-black text-sm text-slate-950 truncate">
                          {fd.name}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Right Panel: Selected Frame Preview & Continue Button */}
                <div className="w-full lg:w-80 bg-slate-50 p-6 rounded-3xl border-[2.5px] border-slate-950 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] space-y-5">
                  <span className="text-xs font-black uppercase text-slate-800 block text-center">
                    SELECTED FRAME
                  </span>

                  {/* Wireframe Mockup */}
                  <div
                    style={{ backgroundColor: selectedFrame.bgHex }}
                    className="w-40 mx-auto rounded-2xl border-2 border-slate-950 p-3 flex flex-col gap-2 shadow-md"
                  >
                    <div
                      className={`text-[9px] font-black text-center uppercase ${selectedFrame.textColor}`}
                    >
                      MEMOLAB
                    </div>
                    {Array.from({ length: selectedProduct.slots }).map((_, i) => (
                      <div key={i} className="w-full h-9 bg-slate-300/80 rounded-xs" />
                    ))}
                    <div
                      className={`text-[8px] text-center font-bold mt-1 ${selectedFrame.textColor}`}
                    >
                      {customCaption}
                    </div>
                  </div>

                  <div className="text-center">
                    <h5 className="font-black text-sm text-slate-950">{selectedFrame.name}</h5>
                    <p className="text-xs font-bold text-slate-500 mt-1">
                      {selectedProduct.slots} Foto Slots
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCapturedPhotos([])
                      setCurrentShotIndex(0)
                      setCurrentStep('camera')
                    }}
                    className="w-full py-4 px-5 rounded-2xl bg-[#ea580c] hover:bg-orange-700 text-white font-black text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= 4. TAKE PHOTOS (CAMERA) ================= */}
          {currentStep === 'camera' && (
            <div className="max-w-7xl w-full mx-auto space-y-3 my-auto animate-in fade-in duration-200">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight flex items-center justify-center gap-3">
                  <span>TAKE PHOTOS</span>
                  <span className="text-xs bg-lime-300 text-slate-950 px-3 py-1 rounded-full border-2 border-slate-950 font-black">
                    {selectedProduct.title.toUpperCase()}
                  </span>
                </h2>
              </div>

              <div className="flex flex-row gap-4 sm:gap-6 items-center justify-center w-full">
                {/* Left Column: Compact Your Photos Drawer (Thumbnails) */}
                <div className="w-28 sm:w-36 bg-slate-50 p-2.5 rounded-2xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-2 shrink-0">
                  <span className="text-[10px] font-black uppercase text-slate-800 block text-center truncate">
                    PHOTOS ({capturedPhotos.length}/{selectedProduct.slots})
                  </span>

                  <div className="flex flex-col gap-1.5">
                    {Array.from({ length: selectedProduct.slots }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-full aspect-[4/3] rounded-lg border-2 overflow-hidden bg-white flex items-center justify-center shadow-xs ${
                          capturedPhotos[i]
                            ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                            : 'border-slate-300 border-dashed'
                        }`}
                      >
                        {capturedPhotos[i] ? (
                          <img
                            src={capturedPhotos[i]}
                            alt={`Shot ${i}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] font-black text-slate-400">#{i + 1}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Center Column: Extra Large Viewfinder (LEBIH GEDE LAGI) */}
                <div className="flex-1 max-w-4xl w-full flex flex-col items-center space-y-3">
                  {/* Viewfinder Frame - Huge & Immersive */}
                  <div className="w-full aspect-[4/3] max-h-[calc(100vh-220px)] bg-slate-900 rounded-[32px] border-4 border-slate-950 overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover -scale-x-100 ${
                        cameraActive ? 'block' : 'hidden'
                      }`}
                    />

                    {!cameraActive && (
                      <div className="text-center p-6 space-y-2">
                        <Camera className="w-16 h-16 text-lime-400 mx-auto animate-pulse" />
                        <h4 className="font-black text-white text-lg">Studio Camera Ready</h4>
                        <p className="text-xs text-slate-400">
                          Klik tombol kamera di bawah untuk mengambil foto studio
                        </p>
                      </div>
                    )}

                    {/* Countdown Overlay */}
                    {countdown !== null && (
                      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs flex flex-col items-center justify-center z-20">
                        <div className="text-[140px] font-black text-lime-300 animate-bounce tracking-tight drop-shadow-[6px_6px_0px_rgba(15,23,42,1)]">
                          {countdown}
                        </div>
                        <span className="text-sm font-black text-white uppercase tracking-widest mt-2">
                          GET READY! SMILE!
                        </span>
                      </div>
                    )}

                    {/* Frame Guide Wireframe */}
                    <div className="absolute inset-6 border-2 border-white/40 rounded-2xl pointer-events-none flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border-2 border-white/60" />
                    </div>
                  </div>

                  {/* Large Shutter Button */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setCountdown(3)}
                      disabled={countdown !== null}
                      className="w-20 h-20 rounded-full bg-[#ea580c] hover:bg-orange-700 active:scale-95 text-white flex items-center justify-center border-4 border-slate-950 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] cursor-pointer disabled:opacity-50 transition-transform"
                    >
                      <Camera className="w-8 h-8" />
                    </button>
                  </div>
                </div>

                {/* Right Column: Compact Tips & Quick Snap */}
                <div className="w-28 sm:w-36 bg-slate-50 p-3 rounded-2xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-2.5 text-center shrink-0">
                  <span className="text-2xl block">✨</span>
                  <h4 className="font-black text-xs text-slate-950 leading-snug">
                    SMILE ON CAMERA!
                  </h4>
                  <p className="text-[10px] font-bold text-slate-600 leading-tight">
                    Show off your best look!
                  </p>

                  <div className="pt-2 border-t-2 border-slate-200">
                    <button
                      type="button"
                      onClick={triggerCapture}
                      className="w-full py-2 px-2.5 rounded-xl bg-slate-950 text-white font-black text-[11px] hover:bg-slate-800 cursor-pointer shadow-xs"
                    >
                      Snap Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 5. REVIEW & DONE (EDIT STUDIO + GESER + ZOOM) ================= */}
          {currentStep === 'review-done' && (
            <div className="w-full max-w-6xl h-full max-h-[calc(100vh-130px)] mx-auto flex flex-col justify-between overflow-hidden animate-in fade-in duration-200 py-1">
              {/* Header Title (Compact) */}
              <div className="text-center shrink-0 mb-1">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
                  REVIEW & DONE
                </h2>
                <p className="text-xs font-bold text-slate-500">
                  💡 Geser, zoom, atau tukar foto agar pas dengan frame favoritmu.
                </p>
              </div>

              {/* Main Workspace Row - Strictly Constrained within Viewport Height */}
              <div className="flex-1 min-h-0 flex flex-row items-center justify-center gap-6 sm:gap-10 w-full overflow-hidden">
                {/* Center: The Photobooth Strip strictly constrained to viewport height (NEVER OVERFLOWS) */}
                <div className="flex flex-col items-center justify-center shrink-0 my-auto">
                  <div
                    style={{ backgroundColor: selectedFrame.bgHex }}
                    className={`${
                      selectedProduct.category === 'Photo Strip'
                        ? 'w-[200px] sm:w-[220px]'
                        : selectedProduct.category === 'Collage'
                        ? 'w-[320px] sm:w-[350px]'
                        : selectedProduct.category === 'ID Photo'
                        ? 'w-[280px] sm:w-[300px]'
                        : 'w-[280px] sm:w-[320px]'
                    } p-2.5 rounded-2xl border-[2.5px] border-slate-950 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] flex flex-col justify-between transition-all`}
                  >
                    {/* Top Logo */}
                    <div className="text-center pb-1 shrink-0">
                      <span
                        className={`text-[10px] sm:text-xs font-black tracking-widest uppercase ${selectedFrame.textColor}`}
                      >
                        MEMOLAB SNAP
                      </span>
                    </div>

                    {/* Photo Slots - Rendering Grid or Vertical Strip */}
                    <div
                      className={
                        selectedProduct.category === 'Collage' || selectedProduct.category === 'ID Photo'
                          ? 'grid grid-cols-2 gap-1.5 my-1'
                          : 'flex flex-col gap-1.5 my-1'
                      }
                    >
                      {capturedPhotos.map((photoUrl, idx) => {
                        const adj = photoAdjustments[idx] || { zoom: 1.0, panY: 0 }
                        const isSelectedForSwap = swapSourceIndex === idx
                        return (
                          <div
                            key={idx}
                            className={`w-full ${
                              selectedProduct.category === 'ID Photo'
                                ? 'aspect-[3/4]'
                                : selectedProduct.category === 'Studio'
                                ? 'aspect-[3/2]'
                                : 'aspect-[4/3]'
                            } rounded-lg overflow-hidden bg-slate-100 relative group border-2 transition-all ${
                              isSelectedForSwap
                                ? 'border-[#2563eb] ring-4 ring-blue-500/30 scale-[1.02]'
                                : 'border-slate-950'
                            }`}
                          >
                            {/* Photo with user zoom and pan */}
                            <img
                              src={photoUrl}
                              alt={`Slot ${idx + 1}`}
                              style={{
                                filter: selectedFilter.cssFilter,
                                transform: `scale(${adj.zoom}) translateY(${adj.panY}%)`,
                                transformOrigin: 'center center',
                              }}
                              className="w-full h-full object-cover transition-transform duration-200"
                            />

                            {/* Sticker on first slot */}
                            {idx === 0 && activeSticker && (
                              <div className="absolute top-1.5 right-1.5 text-lg drop-shadow-md pointer-events-none">
                                {activeSticker}
                              </div>
                            )}

                            {/* Slot badge */}
                            <span className="absolute top-1 left-1 bg-black/70 text-white text-[8px] font-black px-1 py-0.5 rounded">
                              #{idx + 1}
                            </span>

                            {/* Touch/Hover Controls for Geser & Zoom */}
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                              {/* Top Bar: Zoom in/out */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 bg-white/95 rounded-full px-1.5 py-0.5 border border-slate-950 shadow-xs">
                                  <button
                                    type="button"
                                    onClick={() => handleAdjustZoom(idx, -0.05)}
                                    title="Zoom Out (Perkecil agar tidak kepotong)"
                                    className="p-0.5 hover:text-blue-600 cursor-pointer"
                                  >
                                    <ZoomOut className="w-2.5 h-2.5" />
                                  </button>
                                  <span className="text-[8px] font-black">{adj.zoom}x</span>
                                  <button
                                    type="button"
                                    onClick={() => handleAdjustZoom(idx, 0.05)}
                                    title="Zoom In"
                                    className="p-0.5 hover:text-blue-600 cursor-pointer"
                                  >
                                    <ZoomIn className="w-2.5 h-2.5" />
                                  </button>
                                </div>

                                <div className="flex items-center gap-1 bg-white/95 rounded-full px-1.5 py-0.5 border border-slate-950 shadow-xs">
                                  <button
                                    type="button"
                                    onClick={() => handleAdjustPanY(idx, -5)}
                                    title="Geser Naik"
                                    className="p-0.5 hover:text-blue-600 cursor-pointer"
                                  >
                                    <ArrowUp className="w-2.5 h-2.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleAdjustPanY(idx, 5)}
                                    title="Geser Turun"
                                    className="p-0.5 hover:text-blue-600 cursor-pointer"
                                  >
                                    <ArrowDown className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Bottom Swap & Move Bar */}
                              <div className="flex items-center justify-center gap-2">
                                {idx > 0 && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleMovePhoto(idx, 'up')
                                    }}
                                    title="Pindah ke Atas"
                                    className="p-1.5 rounded-full bg-white text-slate-950 hover:bg-lime-300 border-2 border-slate-950 cursor-pointer shadow-xs"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleSwapClick(idx)}
                                  className={`px-3 py-1 rounded-full text-xs font-black border-2 border-slate-950 flex items-center gap-1 cursor-pointer shadow-xs ${
                                    isSelectedForSwap
                                      ? 'bg-amber-300 text-slate-950'
                                      : 'bg-white text-slate-950 hover:bg-lime-300'
                                  }`}
                                >
                                  <ArrowLeftRight className="w-3.5 h-3.5" />
                                  <span>{isSelectedForSwap ? 'Batal' : 'Tukar'}</span>
                                </button>

                                {idx < capturedPhotos.length - 1 && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleMovePhoto(idx, 'down')
                                    }}
                                    title="Pindah ke Bawah"
                                    className="p-1.5 rounded-full bg-white text-slate-950 hover:bg-lime-300 border-2 border-slate-950 cursor-pointer shadow-xs"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Bottom Stamp */}
                    <div className="text-center pt-1.5 pb-0.5 shrink-0">
                      <div
                        className={`text-[8px] sm:text-[9px] font-black tracking-wider uppercase ${selectedFrame.textColor}`}
                      >
                        {customCaption}
                      </div>
                      <div className={`text-[7px] font-bold opacity-70 ${selectedFrame.textColor}`}>
                        {new Date().toLocaleDateString('id-ID')} • MEMOLAB SNAP
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Controls (PHOTO EFFECT, STICKERS, CAPTION) - Grouped with NO GAP */}
                <div className="w-full max-w-md flex flex-col gap-3.5 my-auto shrink-0">
                  {/* PHOTO EFFECT */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-2 shrink-0">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 block">
                      PHOTO EFFECT
                    </span>

                    <div className="grid grid-cols-3 gap-2">
                      {FILTER_PRESETS.map((fl) => {
                        const isSelected = selectedFilter.id === fl.id
                        return (
                          <button
                            key={fl.id}
                            type="button"
                            onClick={() => setSelectedFilter(fl)}
                            className={`p-2 rounded-xl border-2 border-slate-950 text-xs font-black transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                              isSelected
                                ? 'bg-lime-300 text-slate-950'
                                : 'bg-white text-slate-800 hover:bg-slate-100'
                            }`}
                          >
                            {fl.name}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* STICKERS */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-2 shrink-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                        STICKERS
                      </span>

                      <div className="flex gap-1.5 bg-white p-1 rounded-xl border-2 border-slate-950">
                        <button
                          type="button"
                          onClick={() => setActiveStickerTab('image')}
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black ${
                            activeStickerTab === 'image'
                              ? 'bg-slate-950 text-white'
                              : 'text-slate-600'
                          }`}
                        >
                          Image
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveStickerTab('text')}
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black ${
                            activeStickerTab === 'text'
                              ? 'bg-slate-950 text-white'
                              : 'text-slate-600'
                          }`}
                        >
                          Text
                        </button>
                      </div>
                    </div>

                    {activeStickerTab === 'image' ? (
                      <div className="flex flex-wrap gap-1.5">
                        {STICKER_LIST.map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => setActiveSticker(st.label.split(' ')[0])}
                            className={`px-2.5 py-1 rounded-xl border-2 border-slate-950 text-xs font-black cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5 ${
                              activeSticker === st.label.split(' ')[0]
                                ? 'bg-lime-300'
                                : 'bg-white hover:bg-slate-100'
                            }`}
                          >
                            {st.label}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setActiveSticker('')}
                          className="px-2.5 py-1 rounded-xl border-2 border-slate-950 text-xs font-black bg-white hover:bg-slate-100 cursor-pointer shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] text-slate-400"
                        >
                          Hapus
                        </button>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={customCaption}
                        onChange={(e) => setCustomCaption(e.target.value)}
                        maxLength={24}
                        placeholder="Ketik teks stempel..."
                        className="w-full bg-white border-2 border-slate-950 rounded-xl p-2 text-xs font-bold text-slate-900 focus:outline-none"
                      />
                    )}
                  </div>

                  {/* Actions: Finish & Print */}
                  <div className="flex items-center justify-between pt-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setCapturedPhotos([])
                        setCurrentShotIndex(0)
                        setCurrentStep('camera')
                      }}
                      className="py-2.5 px-4 rounded-xl bg-white border-2 border-slate-950 text-slate-800 font-black text-xs shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentStep('payment')}
                      className="py-3 px-7 rounded-xl bg-[#ea580c] hover:bg-orange-700 active:translate-x-0.5 active:translate-y-0.5 text-white font-black text-xs border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] cursor-pointer flex items-center gap-2 transition-all"
                    >
                      <span>Finish & print</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= 6. PAYMENT ================= */}
          {currentStep === 'payment' && (
            <div className="max-w-xl w-full mx-auto bg-white rounded-[36px] border-[3px] border-slate-950 p-10 text-center space-y-8 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-black uppercase bg-lime-300 text-slate-950 px-4 py-1.5 rounded-full border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                  PAYMENT SUMMARY
                </span>
                <h3 className="text-3xl font-black text-slate-950 mt-4">SCAN QRIS UNTUK CETAK</h3>
              </div>

              {/* Summary table */}
              <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-950 space-y-3 text-sm text-left shadow-inner">
                <div className="flex justify-between font-bold text-slate-700">
                  <span>Produk:</span>
                  <span className="text-slate-950 font-black">{selectedProduct.title}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-700">
                  <span>Theme:</span>
                  <span className="text-slate-950 font-black">{selectedFrame.name}</span>
                </div>
                <div className="pt-3 border-t-2 border-slate-200 flex justify-between items-center text-base font-black text-slate-950">
                  <span>TOTAL TAGIHAN:</span>
                  <span className="text-rose-600 text-xl font-black">
                    Rp {selectedProduct.price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="bg-white p-5 rounded-3xl border-2 border-slate-950 w-64 h-64 mx-auto flex flex-col items-center justify-center shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
                <QrCode className="w-48 h-48 text-slate-950" />
                <span className="text-[10px] font-mono font-bold text-slate-500 mt-2">
                  NMID: ID102003948291
                </span>
              </div>

              {/* Instant Pay Simulation Button */}
              <button
                type="button"
                onClick={() => setCurrentStep('success-modal')}
                className="w-full py-4 px-6 rounded-2xl bg-[#2563eb] hover:bg-blue-700 text-white font-black text-base border-2 border-slate-950 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] cursor-pointer flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>Simulasi Bayar Berhasil</span>
              </button>
            </div>
          )}

          {/* ================= 7. YAAS! PAYMENT SUCCESSFUL POPUP ================= */}
          {currentStep === 'success-modal' && (
            <div className="max-w-xl w-full mx-auto bg-white rounded-[36px] border-[3px] border-slate-950 p-10 text-center space-y-8 shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] animate-in zoom-in-95 duration-200">
              {/* Badge YAAS! Smiley matching reference */}
              <div className="w-28 h-28 rounded-full bg-lime-300 border-[3px] border-slate-950 mx-auto flex flex-col items-center justify-center shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] relative">
                <span className="text-4xl">😊</span>
                <span className="text-[10px] font-black uppercase text-slate-950 tracking-wider">
                  YAAS!
                </span>
                <Sparkles className="w-5 h-5 text-amber-500 absolute -top-1 -right-1 fill-current" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-950 uppercase tracking-tight">
                  PAYMENT SUCCESSFUL!
                </h3>
                <p className="text-sm font-bold text-slate-500 max-w-sm mx-auto">
                  We've received your payment. Foto kamu sedang dicetak di mesin printer!
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadRenderedStrip}
                  className="w-full py-4 px-6 rounded-2xl bg-[#ea580c] hover:bg-orange-700 text-white font-black text-base border-2 border-slate-950 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] cursor-pointer flex items-center justify-center gap-2 transition-all active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Softfile (.PNG Asli)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCapturedPhotos([])
                    setCurrentShotIndex(0)
                    setCurrentStep('welcome')
                  }}
                  className="w-full py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-950 font-black text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Back to Home / Sesi Baru</span>
                </button>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}
