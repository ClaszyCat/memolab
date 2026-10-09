import type { ElementType, FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Home,
  BarChart2,
  FileSpreadsheet,
  Box,
  LayoutGrid,
  Sparkles,
  Image as ImageIcon,
  Ticket,
  FileText,
  Download,
  CreditCard,
  Users,
  LogOut,
} from 'lucide-react'

interface SidebarProps {
  onLogout?: () => void
}

interface MenuItemDef {
  path: string
  label: string
  subtext?: string
  icon: ElementType
}

const SECTION_1: MenuItemDef[] = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  {
    path: '/report-analytic',
    label: 'Report Analytic',
    subtext: 'Check Business Performance',
    icon: BarChart2,
  },
  { path: '/transaction', label: 'Transaction', icon: FileSpreadsheet },
]

const SECTION_2: MenuItemDef[] = [
  { path: '/category-frame', label: 'Category Frame', icon: Box },
  { path: '/template-frame', label: 'Template Frame', icon: LayoutGrid },
  { path: '/filter', label: 'Filter', icon: Sparkles },
  { path: '/gallery', label: 'Gallery', icon: ImageIcon },
  { path: '/banner-promo', label: 'Banner Promo', icon: Ticket },
]

const SECTION_3: MenuItemDef[] = [
  { path: '/tutorial', label: 'Tutorial', icon: FileText },
  { path: '/download-app', label: 'Download App', icon: Download },
]

const SECTION_4: MenuItemDef[] = [
  { path: '/subscription', label: 'Subscription', icon: CreditCard },
  { path: '/user-management', label: 'User Management', icon: Users },
]

export const Sidebar: FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation()

  const renderItem = (item: MenuItemDef) => {
    const isActive = location.pathname === item.path || (item.path === '/gallery' && location.pathname === '/galery')
    const Icon = item.icon

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`w-full relative text-left transition-all duration-200 flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer select-none no-underline ${
          isActive
            ? 'bg-blue-600/50 shadow-inner text-white font-semibold'
            : 'text-blue-100/90 hover:text-white hover:bg-white/10'
        }`}
      >
        {/* Active Orange Bar indicator on the left - exact match to screenshot */}
        {isActive && (
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-orange-500 rounded-r-full shadow-sm" />
        )}

        <Icon
          className={`w-5 h-5 flex-shrink-0 ${
            isActive ? 'text-amber-400' : 'text-blue-200/90'
          }`}
          strokeWidth={2}
        />

        <div className="flex flex-col min-w-0 flex-1 leading-tight">
          <span className="text-[14.5px] tracking-wide truncate">
            {item.label}
          </span>
          {item.subtext && (
            <span className="text-[11px] font-normal text-blue-200/70 truncate mt-0.5">
              {item.subtext}
            </span>
          )}
        </div>
      </Link>
    )
  }

  return (
    <aside className="w-64 min-w-[16rem] bg-[#164be4] text-white flex flex-col h-screen select-none border-r border-blue-700/50 shadow-2xl">
      {/* Brand Header */}
      <div className="pt-7 pb-6 px-6">
        <Link to="/report-analytic" className="no-underline">
          <h1 className="text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
            MEMOLAB
          </h1>
        </Link>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-400/30">
        {/* Section 1: Dashboard & Analytics */}
        <div className="space-y-1.5">{SECTION_1.map(renderItem)}</div>

        <div className="border-t border-blue-400/20 my-2 mx-1" />

        {/* Section 2: Frame & Assets */}
        <div className="space-y-1">{SECTION_2.map(renderItem)}</div>

        <div className="border-t border-blue-400/20 my-2 mx-1" />

        {/* Section 3: Guides & Downloads */}
        <div className="space-y-1">{SECTION_3.map(renderItem)}</div>

        <div className="border-t border-blue-400/20 my-2 mx-1" />

        {/* Section 4: Admin & Subscriptions */}
        <div className="space-y-1">{SECTION_4.map(renderItem)}</div>
      </div>

      {/* Footer: Logout Button */}
      <div className="p-4 pt-3 border-t border-blue-500/30">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#ea580c] hover:bg-[#d94e07] active:scale-[0.99] text-white font-semibold text-sm shadow-lg shadow-orange-950/20 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 rotate-180" strokeWidth={2.2} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
