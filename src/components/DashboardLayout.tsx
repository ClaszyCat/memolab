import { useState } from 'react'
import type { FC } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { KioskSimulationModal } from './KioskSimulationModal'

export const DashboardLayout: FC = () => {
  const navigate = useNavigate()
  const [showSimulateModal, setShowSimulateModal] = useState(false)
  const [showLogoutAlert, setShowLogoutAlert] = useState(false)

  const handleLogoutConfirm = () => {
    setShowLogoutAlert(false)
    navigate('/login')
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] text-slate-800 antialiased">
      {/* Sidebar navigation */}
      <Sidebar onLogout={() => setShowLogoutAlert(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Scrollable View Content for active route */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="max-w-7xl mx-auto">
            <Outlet context={{ onSimulateKiosk: () => setShowSimulateModal(true) }} />
          </div>
        </main>
      </div>

      {/* Interactive Kiosk Touchscreen Simulation Modal */}
      {showSimulateModal && (
        <KioskSimulationModal onClose={() => setShowSimulateModal(false)} />
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutAlert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h3 className="font-bold text-slate-900 text-base">Konfirmasi Logout</h3>
            <p className="text-xs text-slate-500">
              Apakah Anda yakin ingin keluar dari akun manajemen MEMOLAB?
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowLogoutAlert(false)}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#d94e07] text-white text-xs font-bold cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
