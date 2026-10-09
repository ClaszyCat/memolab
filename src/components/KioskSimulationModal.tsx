import { useState, useEffect } from 'react'
import type { FC } from 'react'
import {
  X,
  Camera,
  Printer,
  QrCode,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Heart,
} from 'lucide-react'

interface KioskSimulationModalProps {
  onClose: () => void
}

type KioskStep = 'select-frame' | 'payment' | 'countdown' | 'filters' | 'printing'

export const KioskSimulationModal: FC<KioskSimulationModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<KioskStep>('select-frame')
  const [selectedFrame, setSelectedFrame] = useState('Korean 4-Cut Classic')
  const [countdown, setCountdown] = useState(3)
  const [printProgress, setPrintProgress] = useState(0)

  // Countdown timer simulation
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (step === 'countdown' && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    } else if (step === 'countdown' && countdown === 0) {
      setStep('filters')
    }
    return () => clearTimeout(timer)
  }, [step, countdown])

  // Printing progress simulation
  useEffect(() => {
    let progressTimer: ReturnType<typeof setTimeout>
    if (step === 'printing') {
      if (printProgress < 100) {
        progressTimer = setTimeout(() => setPrintProgress((p) => p + 25), 600)
      }
    }
    return () => clearTimeout(progressTimer)
  }, [step, printProgress])

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      {/* Touchscreen Monitor Frame */}
      <div className="w-full max-w-4xl bg-slate-950 rounded-3xl border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col relative aspect-[16/10] max-h-[85vh]">
        {/* Top Kiosk Bar */}
        <div className="bg-slate-900/90 px-6 py-3 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-black text-sm tracking-widest uppercase">MEMOLAB KIOSK TOUCHSCREEN</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Screen Content by Step */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center text-white relative">
          {step === 'select-frame' && (
            <div className="space-y-6 max-w-2xl w-full">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Langkah 1 dari 4</span>
              <h2 className="text-3xl font-black">PILIH DESAIN FRAME FAVORITMU</h2>

              <div className="grid grid-cols-3 gap-5">
                {[
                  { name: 'Korean 4-Cut Classic', color: 'from-pink-400 to-rose-500', slots: '4 Slots Strip' },
                  { name: 'Y2K Cyber Retro', color: 'from-purple-500 to-indigo-600', slots: '3 Slots Strip' },
                  { name: 'Polaroid Minimalist', color: 'from-amber-400 to-orange-500', slots: '1 Slot Big' },
                ].map((fr) => (
                  <button
                    key={fr.name}
                    onClick={() => {
                      setSelectedFrame(fr.name)
                      setStep('payment')
                    }}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/15 border-2 border-white/10 hover:border-amber-400 transition-all flex flex-col items-center cursor-pointer group"
                  >
                    <div className={`w-20 h-28 rounded-xl bg-gradient-to-b ${fr.color} mb-3 shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center`}>
                      <Heart className="w-6 h-6 text-white/80" />
                    </div>
                    <span className="font-bold text-sm">{fr.name}</span>
                    <span className="text-xs text-slate-400 mt-1">{fr.slots}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-5 max-w-md w-full">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Langkah 2 dari 4</span>
              <h2 className="text-2xl font-black">SCAN QRIS UNTUK PEMBAYARAN</h2>
              <p className="text-xs text-slate-400">Total Biaya: <strong className="text-white text-base">Rp 35.000</strong> (2 Lembar Strip)</p>

              <div className="p-4 bg-white rounded-2xl w-52 h-52 mx-auto flex flex-col items-center justify-center shadow-2xl">
                <QrCode className="w-36 h-36 text-slate-900" />
                <span className="text-[10px] font-bold text-slate-600 mt-2">NMID: ID1020039482</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setCountdown(3)
                    setStep('countdown')
                  }}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-lg transition-transform hover:scale-105 cursor-pointer"
                >
                  ✓ Simulasi Bayar Berhasil (Mulai Foto)
                </button>
              </div>
            </div>
          )}

          {step === 'countdown' && (
            <div className="space-y-6">
              <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center mx-auto">
                <Camera className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-slate-300">SIAP-SIAP POSE DALAM...</h3>
              <div className="text-8xl font-black text-amber-400 animate-bounce">{countdown}</div>
              <p className="text-xs text-slate-400">Tatap lensa kamera di bagian atas layar</p>
            </div>
          )}

          {step === 'filters' && (
            <div className="space-y-6 max-w-lg w-full">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Langkah 3 dari 4</span>
              <h2 className="text-2xl font-black">PILIH FILTER WARNA</h2>

              <div className="flex justify-center gap-3">
                {['Natural Glow', 'B&W Film', 'Warm Vintage', 'Pastel'].map((fl, i) => (
                  <button
                    key={fl}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      i === 0
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-white/10 text-white border-white/20'
                    }`}
                  >
                    {fl}
                  </button>
                ))}
              </div>

              <div className="w-48 h-64 bg-slate-800 rounded-xl mx-auto border-2 border-white/20 flex flex-col items-center justify-center p-3 shadow-2xl">
                <Sparkles className="w-8 h-8 text-amber-400 mb-2" />
                <span className="text-xs font-bold">Hasil Jepretan Siap!</span>
                <span className="text-[10px] text-slate-400">{selectedFrame}</span>
              </div>

              <button
                onClick={() => {
                  setPrintProgress(0)
                  setStep('printing')
                }}
                className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                Cetak Foto Sekarang (DNP High Speed)
              </button>
            </div>
          )}

          {step === 'printing' && (
            <div className="space-y-6 max-w-md w-full">
              <div className="w-20 h-20 rounded-full bg-blue-500/20 border-2 border-blue-400 flex items-center justify-center mx-auto">
                <Printer className="w-10 h-10 text-blue-400 animate-bounce" />
              </div>

              {printProgress < 100 ? (
                <>
                  <h3 className="text-2xl font-black">SEDANG MENCETAK FOTO...</h3>
                  <p className="text-xs text-slate-400">Harap tunggu sebentar, foto Anda sedang keluar di slot bawah mesin.</p>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-500"
                      style={{ width: `${printProgress}%` }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                    <h3 className="text-2xl font-black">FOTO SELESAI DICETAK!</h3>
                  </div>
                  <p className="text-xs text-slate-300">
                    Ambil foto Anda di tray bawah. Scan QR di struk untuk simpan softfile & GIF.
                  </p>
                  <button
                    onClick={() => setStep('select-frame')}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Kembali ke Menu Awal
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
