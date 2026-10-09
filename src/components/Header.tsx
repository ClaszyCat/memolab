import type { FC } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Bell, MonitorPlay, Printer, Search, ShieldCheck } from 'lucide-react'

const ROUTE_INFO: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Overview Dashboard',
    subtitle: 'Real-time telemetry and operation overview',
  },
  '/report-analytic': {
    title: 'Business Performance Analytics',
    subtitle: 'Revenue, session volume, and popular frames',
  },
  '/transaction': {
    title: 'Transaction Logs',
    subtitle: 'Detailed receipt and payment histories',
  },
  '/category-frame': {
    title: 'Category Frame Management',
    subtitle: 'Manage dimensions, strip configurations and card layouts',
  },
  '/template-frame': {
    title: 'Template Frame Designer',
    subtitle: 'Upload overlay graphics, transparent cutouts & seasonal themes',
  },
  '/filter': {
    title: 'Camera Filters & Presets',
    subtitle: 'Color LUTs, contrast, monochrome, and warm tones for DSLR capture',
  },
  '/gallery': {
    title: 'Visitor Gallery & Reprints',
    subtitle: 'Browse captured photos, generate QR downloads, or trigger reprints',
  },
  '/galery': {
    title: 'Visitor Gallery & Reprints',
    subtitle: 'Browse captured photos, generate QR downloads, or trigger reprints',
  },
  '/banner-promo': {
    title: 'Banner & Idle Screensavers',
    subtitle: 'Marketing banners displayed when kiosk is in idle state',
  },
  '/tutorial': {
    title: 'Hardware & Setup Guide',
    subtitle: 'Printer paper loading, DSLR camera tethering, and QRIS setup',
  },
  '/download-app': {
    title: 'Download Kiosk Client',
    subtitle: 'Desktop application for touchscreens and kiosk hardware',
  },
  '/subscription': {
    title: 'MemoLab Subscription',
    subtitle: 'Active tier, kiosk slots license, and billing invoices',
  },
  '/user-management': {
    title: 'Staff & Operator Management',
    subtitle: 'Manage staff credentials, permissions, and shift logs',
  },
}

export const Header: FC = () => {
  const location = useLocation()
  const currentInfo = ROUTE_INFO[location.pathname] || {
    title: 'MEMOLAB Command Center',
    subtitle: 'Photobooth system management',
  }

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
          {currentInfo.title}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            3 Booths Online
          </span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">{currentInfo.subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search frame, transaction, booth..."
            className="w-64 pl-9 pr-4 py-2 text-xs bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-slate-800 rounded-lg border border-transparent focus:border-blue-500 focus:outline-none transition-all"
          />
        </div>

        {/* Printer Paper Quick Status */}
        <div className="flex items-center gap-2 bg-slate-100/90 px-3 py-1.5 rounded-lg border border-slate-200/60 text-xs text-slate-700">
          <Printer className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-medium">Paper:</span>
          <span className="text-emerald-600 font-bold">320 / 700</span>
        </div>

        {/* Live Kiosk Screen Mode Button */}
        <Link
          to="/booth"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer no-underline"
        >
          <MonitorPlay className="w-3.5 h-3.5" />
          <span>Buka Layar Kiosk (/booth)</span>
        </Link>

        {/* Notifications */}
        <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg relative cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            ML
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
              Admin MemoLab
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600 inline" />
            </div>
            <div className="text-[10px] text-slate-500">Super Administrator</div>
          </div>
        </div>
      </div>
    </header>
  )
}
