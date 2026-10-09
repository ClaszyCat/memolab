import { useState, useMemo } from 'react'
import type { FC } from 'react'
import {
  Search,
  CheckCircle2,
  Clock,
  Printer,
  QrCode,
  Download,
  AlertCircle,
  Calendar,
  Building2,
  TrendingUp,
  Receipt,
  FileSpreadsheet,
  X,
  CreditCard,
  Banknote,
  RotateCcw,
  BarChart3,
} from 'lucide-react'

interface TxRecord {
  id: string
  referenceNo: string
  sessionCode: string
  kiosk: string
  location: string
  date: string
  time: string
  frameName: string
  category: string
  copies: number
  unitPrice: number
  total: number
  paymentMethod: 'QRIS' | 'Cash' | 'Debit'
  paymentProvider?: string
  status: 'Completed' | 'Printing' | 'Failed'
  customerPhone?: string
}

const FULL_TRANSACTIONS: TxRecord[] = [
  {
    id: 'TRX-94821',
    referenceNo: 'NMID-802914801',
    sessionCode: 'SES-8921',
    kiosk: 'Booth 01',
    location: 'Tunjungan Plaza (Lt. 3)',
    date: '2026-10-09',
    time: '19:42 WIB',
    frameName: 'Korean 4-Cut Classic Pastel',
    category: 'Strip 2x6',
    copies: 2,
    unitPrice: 35000,
    total: 35000,
    paymentMethod: 'QRIS',
    paymentProvider: 'BCA QRIS',
    status: 'Completed',
    customerPhone: '0812****8821',
  },
  {
    id: 'TRX-94820',
    referenceNo: 'NMID-802914800',
    sessionCode: 'SES-8920',
    kiosk: 'Booth 02',
    location: 'Mall Grand City (Cinema)',
    date: '2026-10-09',
    time: '19:38 WIB',
    frameName: 'Y2K Cyberpunk Metallic',
    category: 'Strip 2x6',
    copies: 2,
    unitPrice: 35000,
    total: 35000,
    paymentMethod: 'QRIS',
    paymentProvider: 'GoPay',
    status: 'Completed',
    customerPhone: '0857****1902',
  },
  {
    id: 'TRX-94819',
    referenceNo: 'EDC-BCA-59102',
    sessionCode: 'SES-8919',
    kiosk: 'Booth 01',
    location: 'Tunjungan Plaza (Lt. 3)',
    date: '2026-10-09',
    time: '19:31 WIB',
    frameName: 'Wedding Romance Botanical',
    category: '4R Postcard',
    copies: 1,
    unitPrice: 50000,
    total: 50000,
    paymentMethod: 'Debit',
    paymentProvider: 'Debit BCA Chip',
    status: 'Completed',
    customerPhone: '0813****9033',
  },
  {
    id: 'TRX-94818',
    referenceNo: 'CSH-03-8812',
    sessionCode: 'SES-8918',
    kiosk: 'Booth 03',
    location: 'Cafe Senja Corner',
    date: '2026-10-09',
    time: '19:25 WIB',
    frameName: 'Vintage Polaroid Serif Date',
    category: 'Polaroid',
    copies: 2,
    unitPrice: 30000,
    total: 30000,
    paymentMethod: 'Cash',
    paymentProvider: 'Kasir Cafe Senja',
    status: 'Printing',
    customerPhone: '0821****4491',
  },
  {
    id: 'TRX-94817',
    referenceNo: 'NMID-802914798',
    sessionCode: 'SES-8917',
    kiosk: 'Booth 02',
    location: 'Mall Grand City (Cinema)',
    date: '2026-10-09',
    time: '19:10 WIB',
    frameName: 'Korean 4-Cut Classic Pastel',
    category: 'Strip 2x6',
    copies: 4,
    unitPrice: 35000,
    total: 70000,
    paymentMethod: 'QRIS',
    paymentProvider: 'ShopeePay',
    status: 'Completed',
    customerPhone: '0819****1044',
  },
  {
    id: 'TRX-94816',
    referenceNo: 'ERR-JAM-9912',
    sessionCode: 'SES-8916',
    kiosk: 'Booth 03',
    location: 'Cafe Senja Corner',
    date: '2026-10-09',
    time: '18:55 WIB',
    frameName: 'Midnight Star Film Border',
    category: 'Strip 2x6',
    copies: 2,
    unitPrice: 35000,
    total: 35000,
    paymentMethod: 'QRIS',
    paymentProvider: 'BCA QRIS (Refunded)',
    status: 'Failed',
    customerPhone: '0812****0091',
  },
  {
    id: 'TRX-94815',
    referenceNo: 'NMID-802914795',
    sessionCode: 'SES-8915',
    kiosk: 'Booth 01',
    location: 'Tunjungan Plaza (Lt. 3)',
    date: '2026-10-09',
    time: '18:40 WIB',
    frameName: 'Minimalist Clean White',
    category: '4R Postcard',
    copies: 2,
    unitPrice: 45000,
    total: 45000,
    paymentMethod: 'QRIS',
    paymentProvider: 'Dana QRIS',
    status: 'Completed',
    customerPhone: '0852****7712',
  },
  {
    id: 'TRX-94814',
    referenceNo: 'CSH-01-8811',
    sessionCode: 'SES-8914',
    kiosk: 'Booth 01',
    location: 'Tunjungan Plaza (Lt. 3)',
    date: '2026-10-08',
    time: '20:15 WIB',
    frameName: 'Korean 4-Cut Classic Pastel',
    category: 'Strip 2x6',
    copies: 2,
    unitPrice: 35000,
    total: 35000,
    paymentMethod: 'Cash',
    paymentProvider: 'Kasir TP Atrium',
    status: 'Completed',
    customerPhone: '0811****3322',
  },
  {
    id: 'TRX-94813',
    referenceNo: 'NMID-802914790',
    sessionCode: 'SES-8913',
    kiosk: 'Booth 02',
    location: 'Mall Grand City (Cinema)',
    date: '2026-10-08',
    time: '19:50 WIB',
    frameName: 'Y2K Cyberpunk Metallic',
    category: 'Strip 2x6',
    copies: 2,
    unitPrice: 35000,
    total: 35000,
    paymentMethod: 'QRIS',
    paymentProvider: 'BCA QRIS',
    status: 'Completed',
    customerPhone: '0822****4455',
  },
  {
    id: 'TRX-94812',
    referenceNo: 'EDC-MANDIRI-4491',
    sessionCode: 'SES-8912',
    kiosk: 'Booth 01',
    location: 'Tunjungan Plaza (Lt. 3)',
    date: '2026-10-08',
    time: '18:30 WIB',
    frameName: 'Vintage Polaroid Serif Date',
    category: 'Polaroid',
    copies: 2,
    unitPrice: 30000,
    total: 30000,
    paymentMethod: 'Debit',
    paymentProvider: 'Mandiri EDC',
    status: 'Completed',
    customerPhone: '0878****9981',
  },
  {
    id: 'TRX-94811',
    referenceNo: 'NMID-802914782',
    sessionCode: 'SES-8911',
    kiosk: 'Booth 03',
    location: 'Cafe Senja Corner',
    date: '2026-10-07',
    time: '21:10 WIB',
    frameName: 'Midnight Star Film Border',
    category: 'Strip 2x6',
    copies: 2,
    unitPrice: 35000,
    total: 35000,
    paymentMethod: 'QRIS',
    paymentProvider: 'OVO QRIS',
    status: 'Completed',
    customerPhone: '0813****1290',
  },
  {
    id: 'TRX-94810',
    referenceNo: 'CSH-02-8809',
    sessionCode: 'SES-8910',
    kiosk: 'Booth 02',
    location: 'Mall Grand City (Cinema)',
    date: '2026-10-07',
    time: '17:20 WIB',
    frameName: 'Korean 4-Cut Classic Pastel',
    category: 'Strip 2x6',
    copies: 2,
    unitPrice: 35000,
    total: 35000,
    paymentMethod: 'Cash',
    paymentProvider: 'Kasir Grand City',
    status: 'Completed',
    customerPhone: '0812****6677',
  },
]

interface MonthlySale {
  monthKey: string
  label: string
  fullName: string
  revenue: number
  transactions: number
  growthPct: number
  isPeak?: boolean
}

const MONTHLY_SALES_DATA: MonthlySale[] = [
  { monthKey: '2026-01', label: 'Jan', fullName: 'Januari 2026', revenue: 14200000, transactions: 405, growthPct: 0 },
  { monthKey: '2026-02', label: 'Feb', fullName: 'Februari 2026', revenue: 18900000, transactions: 540, growthPct: 33.1 },
  { monthKey: '2026-03', label: 'Mar', fullName: 'Maret 2026', revenue: 16800000, transactions: 480, growthPct: -11.1 },
  { monthKey: '2026-04', label: 'Apr', fullName: 'April 2026', revenue: 21500000, transactions: 614, growthPct: 28.0 },
  { monthKey: '2026-05', label: 'Mei', fullName: 'Mei 2026', revenue: 19800000, transactions: 565, growthPct: -7.9 },
  { monthKey: '2026-06', label: 'Jun', fullName: 'Juni 2026', revenue: 23400000, transactions: 668, growthPct: 18.2 },
  { monthKey: '2026-07', label: 'Jul', fullName: 'Juli 2026', revenue: 24900000, transactions: 711, growthPct: 6.4 },
  { monthKey: '2026-08', label: 'Agu', fullName: 'Agustus 2026', revenue: 22600000, transactions: 645, growthPct: -9.2 },
  { monthKey: '2026-09', label: 'Sep', fullName: 'September 2026', revenue: 25800000, transactions: 737, growthPct: 14.1 },
  { monthKey: '2026-10', label: 'Okt', fullName: 'Oktober 2026 (Bulan Berjalan)', revenue: 28420000, transactions: 812, growthPct: 10.1, isPeak: true },
]

export const TransactionView: FC = () => {
  // Filter States
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'yesterday' | 'week' | 'month'>('all')
  const [selectedMonth, setSelectedMonth] = useState<string>('all')
  const [kioskFilter, setKioskFilter] = useState<string>('All')
  const [filterMethod, setFilterMethod] = useState<string>('All')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState<TxRecord | null>(null)
  const [reprintToast, setReprintToast] = useState<string | null>(null)

  // Filtered dataset
  const filtered = useMemo(() => {
    return FULL_TRANSACTIONS.filter((tx) => {
      // Date filter
      if (dateFilter === 'today' && tx.date !== '2026-10-09') return false
      if (dateFilter === 'yesterday' && tx.date !== '2026-10-08') return false
      if (dateFilter === 'week' && !['2026-10-09', '2026-10-08', '2026-10-07'].includes(tx.date)) return false
      if (dateFilter === 'month' && !tx.date.startsWith('2026-10')) return false

      // Month select
      if (selectedMonth !== 'all' && !tx.date.startsWith(selectedMonth)) return false

      // Kiosk
      if (kioskFilter !== 'All' && !tx.kiosk.toLowerCase().includes(kioskFilter.toLowerCase())) return false

      // Payment method
      if (filterMethod !== 'All' && tx.paymentMethod !== filterMethod) return false

      // Status
      if (filterStatus !== 'All' && tx.status !== filterStatus) return false

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          tx.id.toLowerCase().includes(q) ||
          tx.referenceNo.toLowerCase().includes(q) ||
          tx.kiosk.toLowerCase().includes(q) ||
          tx.frameName.toLowerCase().includes(q) ||
          tx.sessionCode.toLowerCase().includes(q) ||
          (tx.paymentProvider && tx.paymentProvider.toLowerCase().includes(q))
        if (!matches) return false
      }

      return true
    })
  }, [dateFilter, selectedMonth, kioskFilter, filterMethod, filterStatus, searchQuery])

  // Calculated Metrics
  const metrics = useMemo(() => {
    const totalRevenue = filtered
      .filter((t) => t.status !== 'Failed')
      .reduce((sum, t) => sum + t.total, 0)
    const successCount = filtered.filter((t) => t.status === 'Completed').length
    const printingCount = filtered.filter((t) => t.status === 'Printing').length
    const failedCount = filtered.filter((t) => t.status === 'Failed').length
    const totalCopies = filtered
      .filter((t) => t.status !== 'Failed')
      .reduce((sum, t) => sum + t.copies, 0)
    const avgOrderValue = successCount > 0 ? Math.round(totalRevenue / successCount) : 0

    // Payment method breakdown for Pie/Donut Chart
    const qrisRevenue = filtered
      .filter((t) => t.paymentMethod === 'QRIS' && t.status !== 'Failed')
      .reduce((sum, t) => sum + t.total, 0)
    const cashRevenue = filtered
      .filter((t) => t.paymentMethod === 'Cash' && t.status !== 'Failed')
      .reduce((sum, t) => sum + t.total, 0)
    const debitRevenue = filtered
      .filter((t) => t.paymentMethod === 'Debit' && t.status !== 'Failed')
      .reduce((sum, t) => sum + t.total, 0)

    const qrisCount = filtered.filter((t) => t.paymentMethod === 'QRIS').length
    const cashCount = filtered.filter((t) => t.paymentMethod === 'Cash').length
    const debitCount = filtered.filter((t) => t.paymentMethod === 'Debit').length

    const totalValid = totalRevenue || 1
    const qrisPct = Math.round((qrisRevenue / totalValid) * 100)
    const cashPct = Math.round((cashRevenue / totalValid) * 100)
    const debitPct = 100 - qrisPct - cashPct

    // Kiosk Breakdown
    const kiosk1Rev = filtered
      .filter((t) => t.kiosk === 'Booth 01' && t.status !== 'Failed')
      .reduce((sum, t) => sum + t.total, 0)
    const kiosk2Rev = filtered
      .filter((t) => t.kiosk === 'Booth 02' && t.status !== 'Failed')
      .reduce((sum, t) => sum + t.total, 0)
    const kiosk3Rev = filtered
      .filter((t) => t.kiosk === 'Booth 03' && t.status !== 'Failed')
      .reduce((sum, t) => sum + t.total, 0)

    return {
      totalRevenue,
      successCount,
      printingCount,
      failedCount,
      totalCopies,
      avgOrderValue,
      qrisRevenue,
      cashRevenue,
      debitRevenue,
      qrisCount,
      cashCount,
      debitCount,
      qrisPct,
      cashPct,
      debitPct: debitPct < 0 ? 0 : debitPct,
      kiosk1Rev,
      kiosk2Rev,
      kiosk3Rev,
    }
  }, [filtered])

  // SVG Pie Chart stroke math
  // Circumference = 2 * PI * 65 ≈ 408.4
  const radius = 65
  const circumference = 2 * Math.PI * radius
  const qrisOffset = 0
  const cashOffset = -(metrics.qrisPct / 100) * circumference
  const debitOffset = -((metrics.qrisPct + metrics.cashPct) / 100) * circumference

  // Monthly Bar Chart stats
  const maxMonthlyRevenue = useMemo(() => Math.max(...MONTHLY_SALES_DATA.map((d) => d.revenue)), [])
  const totalYtdRevenue = useMemo(() => MONTHLY_SALES_DATA.reduce((acc, cur) => acc + cur.revenue, 0), [])
  const avgMonthlyRevenue = useMemo(() => Math.round(totalYtdRevenue / MONTHLY_SALES_DATA.length), [totalYtdRevenue])

  // Trigger Reprint
  const handleReprint = (tx: TxRecord) => {
    setReprintToast(`Perintah cetak ulang ${tx.id} (${tx.copies} strip) terkirim ke printer ${tx.kiosk}!`)
    setTimeout(() => {
      setReprintToast(null)
    }, 4000)
  }

  // Export to CSV
  const handleExportCSV = () => {
    const headers = 'ID Transaksi,Referensi,Kode Sesi,Kiosk,Lokasi,Tanggal,Waktu,Template,Kategori,Jumlah Cetak,Total Biaya,Metode,Status\n'
    const rows = filtered
      .map(
        (t) =>
          `"${t.id}","${t.referenceNo}","${t.sessionCode}","${t.kiosk}","${t.location}","${t.date}","${t.time}","${t.frameName}","${t.category}",${t.copies},${t.total},"${t.paymentMethod}","${t.status}"`
      )
      .join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `MEMOLAB_TRANSACTIONS_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {reprintToast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <Printer className="w-5 h-5 text-amber-400 animate-pulse" />
          <span className="text-xs font-semibold">{reprintToast}</span>
          <button
            onClick={() => setReprintToast(null)}
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Filter & Date Selector Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Quick Date Range Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mr-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Periode:</span>
            </div>
            {[
              { id: 'all', label: 'Semua Waktu' },
              { id: 'today', label: 'Hari Ini' },
              { id: 'yesterday', label: 'Kemarin' },
              { id: 'week', label: '7 Hari Terakhir' },
              { id: 'month', label: 'Bulan Ini (Okt)' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setDateFilter(p.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  dateFilter === p.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Month Selector Dropdown & Export */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">Pilih Bulan:</span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-600"
              >
                <option value="all">Semua Bulan</option>
                <option value="2026-10">Oktober 2026</option>
                <option value="2026-09">September 2026</option>
                <option value="2026-08">Agustus 2026</option>
              </select>
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl border border-emerald-200/80 transition-all cursor-pointer shadow-xs ml-auto lg:ml-0"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV ({filtered.length} Data)</span>
            </button>
          </div>
        </div>

        {/* Secondary Filters: Kiosk, Payment, Status, Search */}
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari TRX, Ref, Frame, Sesi..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 rounded-xl focus:bg-white focus:border-blue-600 border border-transparent focus:outline-none transition-all"
            />
          </div>

          {/* Kiosk Dropdown */}
          <div className="relative">
            <select
              value={kioskFilter}
              onChange={(e) => setKioskFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-100 rounded-xl border border-transparent focus:bg-white focus:border-blue-600 focus:outline-none font-medium text-slate-700"
            >
              <option value="All">Semua Kiosk Unit (Fleet)</option>
              <option value="Booth 01">Booth 01 - Tunjungan Plaza</option>
              <option value="Booth 02">Booth 02 - Mall Grand City</option>
              <option value="Booth 03">Booth 03 - Cafe Senja</option>
            </select>
          </div>

          {/* Payment Method */}
          <div className="relative">
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-100 rounded-xl border border-transparent focus:bg-white focus:border-blue-600 focus:outline-none font-medium text-slate-700"
            >
              <option value="All">Semua Pembayaran</option>
              <option value="QRIS">QRIS Dinamis</option>
              <option value="Cash">Cash Tunai</option>
              <option value="Debit">Debit EDC Chip</option>
            </select>
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-100 rounded-xl border border-transparent focus:bg-white focus:border-blue-600 focus:outline-none font-medium text-slate-700"
            >
              <option value="All">Semua Status Cetak</option>
              <option value="Completed">Sukses Dicetak</option>
              <option value="Printing">Sedang Proses Cetak</option>
              <option value="Failed">Gagal / Refund</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Omzet */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Omzet Transaksi</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              Rp {metrics.totalRevenue.toLocaleString('id-ID')}
            </div>
            <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span>Rata-rata: Rp {metrics.avgOrderValue.toLocaleString('id-ID')} / transaksi</span>
            </div>
          </div>
        </div>

        {/* Total Transaksi */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Transaksi</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {filtered.length} Transaksi
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              <strong className="text-emerald-600">{metrics.successCount} Sukses</strong> • {metrics.failedCount} Gagal
            </div>
          </div>
        </div>

        {/* Total Lembar Cetak */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Lembar Foto Keluar</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Printer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {metrics.totalCopies} Lembar Strip
            </div>
            <div className="text-xs text-purple-600 font-semibold mt-1">
              DNP Sublimation Paper
            </div>
          </div>
        </div>

        {/* QRIS Dominance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Dominasi Cashless</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {metrics.qrisPct}% QRIS
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Rp {metrics.qrisRevenue.toLocaleString('id-ID')} via QRIS
            </div>
          </div>
        </div>
      </div>

      {/* Analytics & Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Sales Bar Chart (col-span-2) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Tren Total Penjualan Bulanan (2026)</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Grafik omzet bulanan dari seluruh unit kiosk photobooth MEMOLAB</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-full">
                  Peak: Okt (Rp 28.4jt)
                </span>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-1 rounded-full">
                  Avg: Rp {(avgMonthlyRevenue / 1000000).toFixed(1)}jt/bln
                </span>
              </div>
            </div>

            {/* Bar Chart Bars Container */}
            <div className="h-64 flex items-end gap-2 sm:gap-3.5 pt-6 border-b border-slate-100">
              {MONTHLY_SALES_DATA.map((d) => {
                const heightPct = Math.round((d.revenue / maxMonthlyRevenue) * 100)
                const isSelected = selectedMonth === d.monthKey
                const isPeak = d.isPeak

                return (
                  <div
                    key={d.monthKey}
                    onClick={() => setSelectedMonth(selectedMonth === d.monthKey ? 'all' : d.monthKey)}
                    className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] p-2 rounded-xl whitespace-nowrap pointer-events-none z-20 shadow-xl border border-slate-700">
                      <div className="font-bold text-slate-200">{d.fullName}</div>
                      <div className="text-emerald-400 font-black">Rp {d.revenue.toLocaleString('id-ID')}</div>
                      <div className="text-slate-400 text-[9px] mt-0.5">
                        {d.transactions} Transaksi • MoM {d.growthPct >= 0 ? `+${d.growthPct}%` : `${d.growthPct}%`}
                      </div>
                    </div>

                    {/* Bar graphic */}
                    <div className="w-full bg-slate-100 rounded-t-xl relative flex items-end justify-center h-48 overflow-hidden">
                      <div
                        style={{ height: `${heightPct}%` }}
                        className={`w-full transition-all duration-500 rounded-t-xl ${
                          isSelected
                            ? 'bg-gradient-to-t from-orange-600 to-amber-500 ring-2 ring-orange-500 shadow-md'
                            : isPeak
                            ? 'bg-gradient-to-t from-blue-700 to-indigo-500 shadow-md'
                            : 'bg-blue-400 hover:bg-blue-500'
                        }`}
                      />
                    </div>

                    {/* Month Label */}
                    <div className="text-center">
                      <span
                        className={`text-[10px] font-bold block ${
                          isSelected ? 'text-orange-600' : 'text-slate-600 group-hover:text-blue-600'
                        }`}
                      >
                        {d.label}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono hidden sm:block">
                        {(d.revenue / 1000000).toFixed(1)}jt
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-100 mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <span className="text-slate-600">
              Total Penjualan YTD 2026: <strong className="text-slate-900 font-black">Rp {totalYtdRevenue.toLocaleString('id-ID')}</strong> (6.172 Sesi)
            </span>
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => setSelectedMonth('all')}
            >
              {selectedMonth === 'all'
                ? 'Klik batang bulan untuk filter tabel transaksi'
                : `Filter bulan aktif: ${selectedMonth} (Klik untuk reset)`}
            </span>
          </div>
        </div>

        {/* Pie / Donut Chart Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900 text-sm">Distribusi Metode Pembayaran</h3>
              <span className="text-[11px] font-bold text-slate-400">Pie Chart</span>
            </div>
            <p className="text-xs text-slate-500 mb-6">Persentase omzet berdasarkan channel pembayaran</p>

            {/* Donut Chart Visualization */}
            <div className="flex items-center justify-center relative my-2">
              <svg width="180" height="180" viewBox="0 0 180 180" className="rotate-[-90deg]">
                {/* Background Ring */}
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="transparent"
                  stroke="#f1f5f9"
                  strokeWidth="24"
                />

                {/* QRIS Slice (Blue) */}
                {metrics.qrisPct > 0 && (
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="transparent"
                    stroke="#2563eb"
                    strokeWidth="24"
                    strokeDasharray={`${(metrics.qrisPct / 100) * circumference} ${circumference}`}
                    strokeDashoffset={qrisOffset}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                )}

                {/* Cash Slice (Emerald) */}
                {metrics.cashPct > 0 && (
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="24"
                    strokeDasharray={`${(metrics.cashPct / 100) * circumference} ${circumference}`}
                    strokeDashoffset={cashOffset}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                )}

                {/* Debit Slice (Amber) */}
                {metrics.debitPct > 0 && (
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="24"
                    strokeDasharray={`${(metrics.debitPct / 100) * circumference} ${circumference}`}
                    strokeDashoffset={debitOffset}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                )}
              </svg>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Valid</span>
                <span className="text-base font-black text-slate-900">
                  {metrics.successCount + metrics.printingCount} Trx
                </span>
                <span className="text-[10px] text-emerald-600 font-bold">98.4% Berhasil</span>
              </div>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="pt-4 border-t border-slate-100 space-y-2.5 mt-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600 flex-shrink-0" />
                <span className="font-semibold text-slate-700">QRIS Dinamis</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900">{metrics.qrisPct}%</span>
                <span className="text-[11px] text-slate-400 ml-1.5">(Rp {metrics.qrisRevenue.toLocaleString('id-ID')})</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="font-semibold text-slate-700">Cash Tunai</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900">{metrics.cashPct}%</span>
                <span className="text-[11px] text-slate-400 ml-1.5">(Rp {metrics.cashRevenue.toLocaleString('id-ID')})</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0" />
                <span className="font-semibold text-slate-700">Debit EDC Chip</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900">{metrics.debitPct}%</span>
                <span className="text-[11px] text-slate-400 ml-1.5">(Rp {metrics.debitRevenue.toLocaleString('id-ID')})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Row 2: Kiosk Revenue Volume Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Rincian Omzet Berdasarkan Unit Kiosk</h3>
            <p className="text-xs text-slate-500 mt-0.5">Perbandingan kontribusi pendapatan per lokasi unit photobooth</p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
            3 Kiosk Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          {/* Booth 01 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-xs text-slate-900">Booth 01 - Tunjungan</span>
              </div>
              <span className="font-black text-xs text-slate-900">
                Rp {metrics.kiosk1Rev.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                style={{
                  width: `${metrics.totalRevenue ? Math.round((metrics.kiosk1Rev / metrics.totalRevenue) * 100) : 0}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>{metrics.totalRevenue ? Math.round((metrics.kiosk1Rev / metrics.totalRevenue) * 100) : 0}% Total Omzet</span>
              <span>High Traffic Atrium</span>
            </div>
          </div>

          {/* Booth 02 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-xs text-slate-900">Booth 02 - Grand City</span>
              </div>
              <span className="font-black text-xs text-slate-900">
                Rp {metrics.kiosk2Rev.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
                style={{
                  width: `${metrics.totalRevenue ? Math.round((metrics.kiosk2Rev / metrics.totalRevenue) * 100) : 0}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>{metrics.totalRevenue ? Math.round((metrics.kiosk2Rev / metrics.totalRevenue) * 100) : 0}% Total Omzet</span>
              <span>Cinema XXI Corridor</span>
            </div>
          </div>

          {/* Booth 03 */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-xs text-slate-900">Booth 03 - Cafe Senja</span>
              </div>
              <span className="font-black text-xs text-slate-900">
                Rp {metrics.kiosk3Rev.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                style={{
                  width: `${metrics.totalRevenue ? Math.round((metrics.kiosk3Rev / metrics.totalRevenue) * 100) : 0}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>{metrics.totalRevenue ? Math.round((metrics.kiosk3Rev / metrics.totalRevenue) * 100) : 0}% Total Omzet</span>
              <span>Outdoor Terrace</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Detailed Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Daftar Transaksi Lengkap</h3>
            <p className="text-xs text-slate-500">Klik baris transaksi untuk melihat struk digital atau cetak ulang</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            Total {filtered.length} baris ditemukan
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-6">ID Transaksi & Ref</th>
                <th className="py-3.5 px-6">Waktu & Tanggal</th>
                <th className="py-3.5 px-6">Kiosk & Lokasi</th>
                <th className="py-3.5 px-6">Pilihan Frame & Format</th>
                <th className="py-3.5 px-6">Metode Bayar</th>
                <th className="py-3.5 px-6">Total Tagihan</th>
                <th className="py-3.5 px-6">Status Cetak</th>
                <th className="py-3.5 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Tidak ada transaksi yang cocok dengan filter yang dipilih.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedReceipt(tx)}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  >
                    {/* ID & Ref */}
                    <td className="py-4 px-6">
                      <div className="font-mono font-bold text-blue-600 flex items-center gap-1.5">
                        {tx.id}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 truncate max-w-[140px] mt-0.5">
                        {tx.referenceNo}
                      </div>
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded mt-1 inline-block">
                        {tx.sessionCode}
                      </span>
                    </td>

                    {/* Date & Time */}
                    <td className="py-4 px-6">
                      <div className="font-semibold text-slate-900">{tx.time}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {tx.date}
                      </div>
                    </td>

                    {/* Kiosk */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{tx.kiosk}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[160px]">
                        {tx.location}
                      </div>
                    </td>

                    {/* Template Frame */}
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800">{tx.frameName}</div>
                      <div className="text-[11px] text-slate-500">
                        {tx.category} • <strong className="text-slate-700">{tx.copies} lembar</strong>
                      </div>
                    </td>

                    {/* Payment Method */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                            tx.paymentMethod === 'QRIS'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                              : tx.paymentMethod === 'Cash'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                              : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          }`}
                        >
                          {tx.paymentMethod === 'QRIS' && <QrCode className="w-3.5 h-3.5" />}
                          {tx.paymentMethod === 'Cash' && <Banknote className="w-3.5 h-3.5" />}
                          {tx.paymentMethod === 'Debit' && <CreditCard className="w-3.5 h-3.5" />}
                          {tx.paymentMethod}
                        </span>
                        {tx.paymentProvider && (
                          <span className="text-[10px] text-slate-400 pl-0.5">
                            {tx.paymentProvider}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6">
                      <div className="font-black text-slate-900 text-sm">
                        Rp {tx.total.toLocaleString('id-ID')}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        @ Rp {tx.unitPrice.toLocaleString('id-ID')}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {tx.status === 'Completed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Sukses
                        </span>
                      )}
                      {tx.status === 'Printing' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 animate-pulse">
                          <Printer className="w-3.5 h-3.5 text-blue-600" />
                          Mencetak
                        </span>
                      )}
                      {tx.status === 'Failed' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                          Gagal
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedReceipt(tx)}
                          title="Lihat Struk Digital"
                          className="p-1.5 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleReprint(tx)}
                          title="Reprint Cetak Ulang"
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Printer className="w-3 h-3" />
                          <span>Reprint</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Struk Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 relative">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Thermal Receipt Visual Container */}
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-5 text-center font-mono text-xs text-slate-800 space-y-4 shadow-inner">
              <div className="border-b border-dashed border-slate-300 pb-3">
                <h4 className="font-black text-base text-slate-900 tracking-tight font-sans">
                  MEMOLAB PHOTOBOOTH
                </h4>
                <p className="text-[10px] text-slate-500">{selectedReceipt.kiosk} • {selectedReceipt.location}</p>
                <p className="text-[10px] text-slate-400">{selectedReceipt.date} {selectedReceipt.time}</p>
              </div>

              {/* Transaction Codes */}
              <div className="text-left space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">ID Transaksi:</span>
                  <span className="font-bold text-slate-900">{selectedReceipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">No. Referensi:</span>
                  <span className="text-slate-700">{selectedReceipt.referenceNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kode Sesi Foto:</span>
                  <span className="font-bold text-blue-600">{selectedReceipt.sessionCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Metode Bayar:</span>
                  <span className="font-bold text-slate-900">
                    {selectedReceipt.paymentMethod} ({selectedReceipt.paymentProvider})
                  </span>
                </div>
              </div>

              {/* Item Breakdown */}
              <div className="border-t border-b border-dashed border-slate-300 py-3 text-left space-y-1.5">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{selectedReceipt.frameName}</span>
                  <span>Rp {selectedReceipt.total.toLocaleString('id-ID')}</span>
                </div>
                <div className="text-[10px] text-slate-500 flex justify-between">
                  <span>{selectedReceipt.category} ({selectedReceipt.copies} lembar)</span>
                  <span>@ Rp {selectedReceipt.unitPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="text-[10px] text-emerald-600 flex justify-between">
                  <span>PPN & Biaya QRIS (0%)</span>
                  <span>Termasuk</span>
                </div>
              </div>

              {/* Total Paid */}
              <div className="flex justify-between items-center text-sm font-black text-slate-900">
                <span>TOTAL DIBAYAR:</span>
                <span>Rp {selectedReceipt.total.toLocaleString('id-ID')}</span>
              </div>

              {/* Status Badge */}
              <div className="pt-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  STATUS: LUNAS & DICETAK
                </span>
                <p className="text-[9px] text-slate-400 mt-2">
                  Terima kasih telah mengabadikan momen bersama MEMOLAB!
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 mt-5 font-sans">
              <button
                onClick={() => {
                  handleReprint(selectedReceipt)
                  setSelectedReceipt(null)
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reprint ke Kiosk</span>
              </button>
              <button
                onClick={() => {
                  alert(`Struk digital ${selectedReceipt.id} berhasil diunduh.`)
                  setSelectedReceipt(null)
                }}
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Struk</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
