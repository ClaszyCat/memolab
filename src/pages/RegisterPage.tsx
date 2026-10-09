import { useState } from 'react'
import type { FC, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Lock,
  Mail,
  User,
  Store,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export const RegisterPage: FC = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [kioskPlan, setKioskPlan] = useState('single')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = (e: FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert(`Selamat datang di MemoLab, ${businessName || fullName}! Akun Anda telah dibuat.`)
      navigate('/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen w-screen flex bg-slate-900 font-['Plus_Jakarta_Sans',sans-serif] text-slate-100">
      {/* Left side: Brand Showcase */}
      <div className="hidden lg:flex w-5/12 bg-gradient-to-br from-[#164be4] via-[#103bb8] to-[#0a2374] p-14 flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-white text-[#164be4] flex items-center justify-center font-black text-lg shadow-lg">
            ML
          </div>
          <span className="font-black text-2xl tracking-tight text-white">
            MEMOLAB
          </span>
        </div>

        <div className="relative z-10 space-y-6 my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300">
            <Zap className="w-3.5 h-3.5 fill-current" />
            Mulai Bisnis Photobooth Modern
          </div>
          <h2 className="text-3xl font-black leading-tight">
            Tingkatkan Omzet Bisnis Photobooth dengan Sistem Otomatis
          </h2>
          <p className="text-blue-100/80 text-xs leading-relaxed">
            Daftarkan brand Anda hari ini dan nikmati manajemen multi-kiosk tanpa ribet: cetak otomatis, live QRIS payment, dan update frame online.
          </p>

          <div className="space-y-3 pt-2">
            {[
              '14 Hari Uji Coba Gratis Tanpa Kartu Kredit',
              'Auto-detect Printer DNP DS-RX1HS & Citizen',
              'Dukungan Kamera DSLR Canon EOS Tethering',
              'Katalog Frame Gratis Siap Pakai',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-[11px] text-blue-200">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Garansi 99.9% Uptime Kiosk Cloud</span>
          </div>
          <span>Bantuan 24/7 Kru Teknis</span>
        </div>
      </div>

      {/* Right side: Registration Form */}
      <div className="w-full lg:w-7/12 flex flex-col justify-between p-8 sm:p-14 bg-white text-slate-800 overflow-y-auto">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#164be4] text-white flex items-center justify-center font-black text-sm">
              ML
            </div>
            <span className="font-black text-xl text-[#164be4]">MEMOLAB</span>
          </div>
          <div className="text-xs text-slate-500">
            Sudah terdaftar?{' '}
            <Link to="/login" className="font-bold text-[#164be4] hover:underline">
              Masuk di sini
            </Link>
          </div>
        </div>

        <div className="max-w-xl w-full mx-auto my-6 space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Daftar Akun Bisnis Baru
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Lengkapi informasi berikut untuk membuat akun pengelola mesin photobooth.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Pemilik
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Contoh: Yovi Pratama"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Brand / Studio Photobooth
                </label>
                <div className="relative">
                  <Store className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Contoh: PixelSnap Studio"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Bisnis
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@pixelsnap.id"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp (Notif Omzet & Kertas)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="081234567890"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Scale selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Rencana Jumlah Kiosk Photobooth
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'single', title: '1 Kiosk', desc: 'Pop-up / Single Unit' },
                  { id: 'multi', title: '2 - 5 Kiosk', desc: 'Mall & Cafe Network' },
                  { id: 'franchise', title: '6+ Kiosk', desc: 'Franchise Enterprise' },
                ].map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => setKioskPlan(tier.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      kioskPlan === tier.id
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{tier.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimal 8 karakter"
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Konfirmasi Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password"
                    className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs">
                <input
                  type="checkbox"
                  required
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <span className="text-slate-600 text-[11px] leading-relaxed">
                  Saya menyetujui <a href="#terms" className="text-blue-600 font-bold hover:underline">Ketentuan Layanan</a> dan{' '}
                  <a href="#privacy" className="text-blue-600 font-bold hover:underline">Kebijakan Privasi</a> MEMOLAB Cloud.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#164be4] hover:bg-[#133dbb] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <span>Mendaftarkan Bisnis Anda...</span>
              ) : (
                <>
                  <span>Buat Akun Bisnis & Mulai Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center text-[11px] text-slate-400 pt-4">
          © 2026 MEMOLAB Technologies. Solusi Photobooth Kiosk Terpadu.
        </div>
      </div>
    </div>
  )
}
