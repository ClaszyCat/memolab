import { useState } from 'react'
import type { FC, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Sparkles,
  Printer,
  ShieldCheck,
  Camera,
  ArrowRight,
} from 'lucide-react'

export const LoginPage: FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@memolab.id')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/report-analytic')
    }, 600)
  }

  const fillDemoAccount = (role: 'admin' | 'operator') => {
    if (role === 'admin') {
      setEmail('owner@memolab.id')
      setPassword('adminsecret')
    } else {
      setEmail('operator.mall@memolab.id')
      setPassword('operator123')
    }
  }

  return (
    <div className="min-h-screen w-screen flex bg-slate-900 font-['Plus_Jakarta_Sans',sans-serif] text-slate-100">
      {/* Left side: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-14 bg-white text-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#164be4] flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/30">
              ML
            </div>
            <span className="font-black text-2xl tracking-tight text-[#164be4]">
              MEMOLAB
            </span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Kiosk System v2.4
          </span>
        </div>

        <div className="max-w-md w-full mx-auto my-10 space-y-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Selamat Datang
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Masuk ke akun manajemen cloud untuk mengontrol kiosk, memantau omzet, dan memperbarui desain frame.
            </p>
          </div>

          {/* Quick Demo Access Pills */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Quick Fill Demo Akun:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount('admin')}
                className="flex-1 py-1 px-2.5 bg-white hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemoAccount('operator')}
                className="flex-1 py-1 px-2.5 bg-white hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                Kiosk Operator
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Alamat Email / ID Kiosk
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@business.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Password Akun
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault()
                    alert('Silakan hubungi administrator IT untuk reset password kiosk.')
                  }}
                  className="text-[11px] font-semibold text-blue-600 hover:underline"
                >
                  Lupa password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-slate-600 font-medium">Ingat perangkat ini</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#164be4] hover:bg-[#133dbb] active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard MemoLab</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2">
            Belum punya akun bisnis photobooth?{' '}
            <Link
              to="/register"
              className="font-bold text-[#164be4] hover:underline"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-400">
          © 2026 MEMOLAB Technologies. Sistem Photobooth Kiosk Terpadu.
        </div>
      </div>

      {/* Right side: Modern Brand Showcase */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#164be4] via-[#103bb8] to-[#0a2374] p-14 flex-col justify-between text-white relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-blue-200 uppercase">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Sistem Photobooth All-in-One
          </div>
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-xs">
            Multi-Kiosk Fleet Ready
          </span>
        </div>

        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <h2 className="text-4xl font-black leading-tight tracking-tight">
            Kendali Penuh Photobooth Anda dari Mana Saja
          </h2>
          <p className="text-blue-100/80 text-sm leading-relaxed">
            Monitor sisa kertas printer DNP secara real-time, perbarui template frame secara nirkabel, dan terima pembayaran QRIS otomatis tanpa antrean kasir.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
              <Printer className="w-5 h-5 text-amber-300" />
              <div className="font-bold text-sm">Auto 2-inch Split Cut</div>
              <p className="text-[11px] text-blue-200/80">
                Otomatis potong 2 strip identik pada printer DNP DS-RX1HS.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
              <Camera className="w-5 h-5 text-emerald-300" />
              <div className="font-bold text-sm">Canon DSLR Tethering</div>
              <p className="text-[11px] text-blue-200/80">
                Kualitas jepretan studio dengan live countdown dan preview instan.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/15 text-xs text-blue-200">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Koneksi Aman TLS 1.3 Terenkripsi</span>
          </div>
          <span>3 Kiosk Fleet Online</span>
        </div>
      </div>
    </div>
  )
}
