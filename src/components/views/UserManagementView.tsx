import type { FC } from 'react'
import { Plus, Shield, MoreVertical } from 'lucide-react'

export const UserManagementView: FC = () => {
  const users = [
    {
      id: 'USR-1',
      name: 'Yovi Pratama',
      email: 'owner@memolab.id',
      role: 'Super Administrator',
      boothAccess: 'Semua Kiosk (Full Access)',
      lastActive: 'Aktif saat ini',
      status: 'Active',
    },
    {
      id: 'USR-2',
      name: 'Dinda Rahmawati',
      email: 'dinda.tp@memolab.id',
      role: 'Kiosk Operator',
      boothAccess: 'Booth 01 (Tunjungan Plaza)',
      lastActive: '12 menit yang lalu',
      status: 'Active',
    },
    {
      id: 'USR-3',
      name: 'Budi Santoso',
      email: 'budi.gc@memolab.id',
      role: 'Kiosk Operator',
      boothAccess: 'Booth 02 (Mall Grand City)',
      lastActive: '2 jam yang lalu',
      status: 'Active',
    },
    {
      id: 'USR-4',
      name: 'Agus Setiawan',
      email: 'agus.tech@memolab.id',
      role: 'Hardware Technician',
      boothAccess: 'Akses Maintenance',
      lastActive: 'Kemarin',
      status: 'Active',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Manajemen Pengguna & Staf Kru</h3>
          <p className="text-xs text-slate-500">Atur hak akses operator penjaga booth dan teknisi hardware</p>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all cursor-pointer">
          <Plus className="w-4 h-4" />
          Tambah Operator Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-6">Nama & Email</th>
              <th className="py-3.5 px-6">Peran (Role)</th>
              <th className="py-3.5 px-6">Hak Akses Booth</th>
              <th className="py-3.5 px-6">Aktivitas Terakhir</th>
              <th className="py-3.5 px-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/50">
                <td className="py-4 px-6">
                  <div className="font-bold text-slate-900">{u.name}</div>
                  <div className="text-[11px] text-slate-400">{u.email}</div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      u.role === 'Super Administrator'
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : u.role === 'Hardware Technician'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    <Shield className="w-3 h-3" />
                    {u.role}
                  </span>
                </td>
                <td className="py-4 px-6 font-medium text-slate-700">{u.boothAccess}</td>
                <td className="py-4 px-6 text-slate-500">{u.lastActive}</td>
                <td className="py-4 px-6 text-right">
                  <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
