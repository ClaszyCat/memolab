import { useState, useMemo } from 'react'
import type { FC } from 'react'
import {
  Search,
  Calendar,
  Filter,
  ArrowLeft,
  MoreVertical,
  Check,
  Download,
  QrCode,
  Printer,
  Share2,
  Lock,
  Clock,
  Video,
  Image as ImageIcon,
  Camera,
  Users,
  Store,
  TrendingUp,
  CheckCircle2,
  X,
} from 'lucide-react'

// Booth Entity for Level 1 Overview (Image 1)
interface BoothGallery {
  id: string
  name: string
  location: string
  coverUrl: string
  totalImages: number
  totalVideos: number
  totalSessions: number
  avgPerDay: number
  lastSessionTime: string
  lastSessionRelative: string
}

// Media Session Entity for Level 2 Gallery Grid (Image 2)
interface MediaSession {
  id: string
  boothId: string
  boothName: string
  thumbnailUrl: string
  capturedAt: string // e.g. "07 Oct 2026 20:54:02"
  capturedDate: string // YYYY-MM-DD
  frameTag: string // e.g. "KORAN 1", "KORAN 2", "BLACK 3", "TUTUL LIPS"
  status: 'Not Confirm' | 'Not Shareable' | 'Shareable'
  sessionCode: string
  hasVideo: boolean
  copiesPrinted: number
  guestCount: number
}

// Level 1 Booths
const BOOTHS_DATA: BoothGallery[] = [
  {
    id: 'booth-snapdicted',
    name: 'snapdicted',
    location: 'jombang',
    coverUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80',
    totalImages: 2236,
    totalVideos: 760,
    totalSessions: 468,
    avgPerDay: 15,
    lastSessionTime: '07 Oct 2026 20:54:02',
    lastSessionRelative: '11 minutes ago',
  },
  {
    id: 'booth-01',
    name: 'MemoLab Booth 01',
    location: 'Tunjungan Plaza (Lt. 3 Atrium)',
    coverUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    totalImages: 3410,
    totalVideos: 1120,
    totalSessions: 692,
    avgPerDay: 24,
    lastSessionTime: '07 Oct 2026 20:45:10',
    lastSessionRelative: '20 minutes ago',
  },
  {
    id: 'booth-02',
    name: 'MemoLab Booth 02',
    location: 'Mall Grand City (Cinema Corridor)',
    coverUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
    totalImages: 1840,
    totalVideos: 590,
    totalSessions: 388,
    avgPerDay: 18,
    lastSessionTime: '07 Oct 2026 19:30:15',
    lastSessionRelative: '1 hour ago',
  },
]

// Level 2 Media Sessions (Within 60-day Retention Window)
const SESSIONS_DATA: MediaSession[] = [
  {
    id: 'SES-01',
    boothId: 'booth-snapdicted',
    boothName: 'snapdicted (jombang)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    capturedAt: '07 Oct 2026 20:54:02',
    capturedDate: '2026-10-07',
    frameTag: 'KORAN 1',
    status: 'Not Confirm',
    sessionCode: 'SNP-9941',
    hasVideo: true,
    copiesPrinted: 2,
    guestCount: 2,
  },
  {
    id: 'SES-02',
    boothId: 'booth-snapdicted',
    boothName: 'snapdicted (jombang)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
    capturedAt: '07 Oct 2026 20:49:25',
    capturedDate: '2026-10-07',
    frameTag: 'KORAN 2',
    status: 'Not Confirm',
    sessionCode: 'SNP-9940',
    hasVideo: true,
    copiesPrinted: 2,
    guestCount: 2,
  },
  {
    id: 'SES-03',
    boothId: 'booth-snapdicted',
    boothName: 'snapdicted (jombang)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80',
    capturedAt: '07 Oct 2026 20:21:27',
    capturedDate: '2026-10-07',
    frameTag: 'BLACK 3',
    status: 'Not Shareable',
    sessionCode: 'SNP-9939',
    hasVideo: true,
    copiesPrinted: 2,
    guestCount: 2,
  },
  {
    id: 'SES-04',
    boothId: 'booth-snapdicted',
    boothName: 'snapdicted (jombang)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    capturedAt: '07 Oct 2026 20:13:38',
    capturedDate: '2026-10-07',
    frameTag: 'TUTUL LIPS',
    status: 'Not Shareable',
    sessionCode: 'SNP-9938',
    hasVideo: true,
    copiesPrinted: 2,
    guestCount: 2,
  },
  {
    id: 'SES-05',
    boothId: 'booth-snapdicted',
    boothName: 'snapdicted (jombang)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    capturedAt: '07 Oct 2026 19:55:12',
    capturedDate: '2026-10-07',
    frameTag: 'KORAN 1',
    status: 'Shareable',
    sessionCode: 'SNP-9937',
    hasVideo: true,
    copiesPrinted: 4,
    guestCount: 1,
  },
  {
    id: 'SES-06',
    boothId: 'booth-snapdicted',
    boothName: 'snapdicted (jombang)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
    capturedAt: '07 Oct 2026 19:40:44',
    capturedDate: '2026-10-07',
    frameTag: 'PASTEL PINK',
    status: 'Shareable',
    sessionCode: 'SNP-9936',
    hasVideo: true,
    copiesPrinted: 2,
    guestCount: 2,
  },
  {
    id: 'SES-07',
    boothId: 'booth-snapdicted',
    boothName: 'snapdicted (jombang)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    capturedAt: '07 Oct 2026 19:15:30',
    capturedDate: '2026-10-07',
    frameTag: 'BLACK 3',
    status: 'Not Confirm',
    sessionCode: 'SNP-9935',
    hasVideo: true,
    copiesPrinted: 2,
    guestCount: 2,
  },
  {
    id: 'SES-08',
    boothId: 'booth-snapdicted',
    boothName: 'snapdicted (jombang)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
    capturedAt: '07 Oct 2026 18:50:09',
    capturedDate: '2026-10-07',
    frameTag: 'TUTUL LIPS',
    status: 'Shareable',
    sessionCode: 'SNP-9934',
    hasVideo: true,
    copiesPrinted: 4,
    guestCount: 4,
  },
  {
    id: 'SES-09',
    boothId: 'booth-snapdicted',
    boothName: 'snapdicted (jombang)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=80',
    capturedAt: '06 Oct 2026 21:05:14',
    capturedDate: '2026-10-06',
    frameTag: 'KORAN 2',
    status: 'Shareable',
    sessionCode: 'SNP-9933',
    hasVideo: true,
    copiesPrinted: 2,
    guestCount: 3,
  },
  {
    id: 'SES-10',
    boothId: 'booth-snapdicted',
    boothName: 'snapdicted (jombang)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
    capturedAt: '05 Oct 2026 17:22:40',
    capturedDate: '2026-10-05',
    frameTag: 'BLACK 3',
    status: 'Not Shareable',
    sessionCode: 'SNP-9932',
    hasVideo: false,
    copiesPrinted: 2,
    guestCount: 2,
  },
  {
    id: 'SES-11',
    boothId: 'booth-01',
    boothName: 'MemoLab Booth 01 (Tunjungan)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    capturedAt: '07 Oct 2026 20:45:10',
    capturedDate: '2026-10-07',
    frameTag: 'KORAN 1',
    status: 'Shareable',
    sessionCode: 'TP-4821',
    hasVideo: true,
    copiesPrinted: 2,
    guestCount: 2,
  },
  {
    id: 'SES-12',
    boothId: 'booth-02',
    boothName: 'MemoLab Booth 02 (Grand City)',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
    capturedAt: '07 Oct 2026 19:30:15',
    capturedDate: '2026-10-07',
    frameTag: 'TUTUL LIPS',
    status: 'Not Confirm',
    sessionCode: 'GC-3109',
    hasVideo: true,
    copiesPrinted: 2,
    guestCount: 2,
  },
]

export const GalleryView: FC = () => {
  // Navigation: Null means Level 1 (Overview list of booths), Selected means Level 2 (Specific booth gallery)
  const [selectedBooth, setSelectedBooth] = useState<BoothGallery | null>(null)

  // Filters for Level 2
  const [startDate, setStartDate] = useState<string>('2026-08-10') // 2 months ago
  const [endDate, setEndDate] = useState<string>('2026-10-10')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedFrame, setSelectedFrame] = useState<string>('All Frames')

  // Selected media checkboxes for bulk actions
  const [selectedSessionIds, setSelectedSessionIds] = useState<string[]>([])

  // Modal Detail View
  const [modalSession, setModalSession] = useState<MediaSession | null>(null)
  const [actionToast, setActionToast] = useState<string | null>(null)

  // Level 1 Aggregated Metrics
  const overviewStats = useMemo(() => {
    return {
      activeBooths: BOOTHS_DATA.length,
      totalSessions: BOOTHS_DATA.reduce((acc, b) => acc + b.totalSessions, 0),
      totalImages: BOOTHS_DATA.reduce((acc, b) => acc + b.totalImages, 0),
      totalVideos: BOOTHS_DATA.reduce((acc, b) => acc + b.totalVideos, 0),
    }
  }, [])

  // Filtered Sessions for Level 2
  const filteredSessions = useMemo(() => {
    return SESSIONS_DATA.filter((s) => {
      // Must match active booth if selected
      if (selectedBooth && s.boothId !== selectedBooth.id) return false

      // Frame filter
      if (selectedFrame !== 'All Frames' && s.frameTag !== selectedFrame) return false

      // Search query (session ID, session code, frame tag, booth name)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          s.id.toLowerCase().includes(q) ||
          s.sessionCode.toLowerCase().includes(q) ||
          s.frameTag.toLowerCase().includes(q) ||
          s.boothName.toLowerCase().includes(q)
        if (!matches) return false
      }

      // Date Range (Respect 60-day retention)
      if (startDate && s.capturedDate < startDate) return false
      if (endDate && s.capturedDate > endDate) return false

      return true
    })
  }, [selectedBooth, selectedFrame, searchQuery, startDate, endDate])

  // Stats for Level 2 Header Pills (matching Image 2)
  const level2Stats = useMemo(() => {
    const totalS = filteredSessions.length
    const shareable = filteredSessions.filter((s) => s.status === 'Shareable').length
    const notShareable = filteredSessions.filter((s) => s.status === 'Not Shareable' || s.status === 'Not Confirm').length
    const images = selectedBooth ? selectedBooth.totalImages : 2236
    const videos = selectedBooth ? selectedBooth.totalVideos : 760
    return {
      sessions: selectedBooth ? selectedBooth.totalSessions : totalS,
      images,
      videos,
      shareable: selectedBooth?.id === 'booth-snapdicted' ? 130 : shareable,
      notShareable: selectedBooth?.id === 'booth-snapdicted' ? 338 : notShareable,
      latestTime: selectedBooth?.lastSessionRelative || '11 minutes ago',
    }
  }, [filteredSessions, selectedBooth])

  // Checkbox toggle
  const toggleSelectSession = (id: string) => {
    if (selectedSessionIds.includes(id)) {
      setSelectedSessionIds(selectedSessionIds.filter((item) => item !== id))
    } else {
      setSelectedSessionIds([...selectedSessionIds, id])
    }
  }

  const toggleSelectAll = () => {
    if (selectedSessionIds.length === filteredSessions.length) {
      setSelectedSessionIds([])
    } else {
      setSelectedSessionIds(filteredSessions.map((s) => s.id))
    }
  }

  // Trigger Reprint
  const handleTriggerReprint = (session: MediaSession) => {
    setActionToast(`Perintah cetak ulang #${session.sessionCode} terkirim ke printer ${session.boothName}!`)
    setTimeout(() => setActionToast(null), 3500)
    setModalSession(null)
  }

  return (
    <div className="space-y-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Alert */}
      {actionToast && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{actionToast}</span>
          <button
            onClick={() => setActionToast(null)}
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* ================= LEVEL 1: GALLERY OVERVIEW PER BOOTH (IMAGE 1) ================= */}
      {!selectedBooth ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Top Header Card with 4 Metric Chips (Image 1 Header) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-xs border border-blue-100">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Gallery Overview</h2>
                <p className="text-xs text-slate-500 mt-0.5">Media summary of all your booths/events.</p>
              </div>
            </div>

            {/* 4 Metric Chips on the right matching Image 1 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full xl:w-auto">
              {/* Total Booth */}
              <div className="bg-white p-3.5 px-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Booth</span>
                  <span className="text-lg font-black text-slate-900">{overviewStats.activeBooths}</span>
                  <span className="text-[10px] text-slate-400 block -mt-0.5">Active Booth</span>
                </div>
              </div>

              {/* Total Sessions */}
              <div className="bg-white p-3.5 px-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Sessions</span>
                  <span className="text-lg font-black text-slate-900">{overviewStats.totalSessions}</span>
                  <span className="text-[10px] text-slate-400 block -mt-0.5">Photo Sessions</span>
                </div>
              </div>

              {/* Total Images */}
              <div className="bg-white p-3.5 px-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Images</span>
                  <span className="text-lg font-black text-slate-900">{overviewStats.totalImages.toLocaleString('id-ID')}</span>
                  <span className="text-[10px] text-slate-400 block -mt-0.5">Images</span>
                </div>
              </div>

              {/* Total Videos */}
              <div className="bg-white p-3.5 px-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Videos</span>
                  <span className="text-lg font-black text-slate-900">{overviewStats.totalVideos.toLocaleString('id-ID')}</span>
                  <span className="text-[10px] text-slate-400 block -mt-0.5">Videos</span>
                </div>
              </div>
            </div>
          </div>

          {/* 60-Day Storage Retention Notice */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 p-4 rounded-2xl border border-blue-200/80 flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>
                <strong>Kebijakan Retensi Media 2 Bulan (60 Hari):</strong> Foto dan video hasil jepretan pengunjung disimpan di cloud selama 60 hari terakhir agar performa sistem tetap ringan dan cepat.
              </span>
            </div>
            <span className="font-bold bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200 shadow-xs whitespace-nowrap ml-4">
              Auto-Archive Active
            </span>
          </div>

          {/* Booth Media Cards Grid (Matching Image 1: snapdicted card) */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {BOOTHS_DATA.map((booth) => (
              <div
                key={booth.id}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Booth Cover Photo (like Image 1 couple posing with peace signs) */}
                  <div className="h-64 relative overflow-hidden bg-slate-900">
                    <img
                      src={booth.coverUrl}
                      alt={booth.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Online Kiosk</span>
                    </div>
                  </div>

                  {/* Booth Info */}
                  <div className="p-6 pb-4">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{booth.name}</h3>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5 capitalize">{booth.location}</p>

                    {/* 4 Sub-metrics inside card (Image 1) */}
                    <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-slate-100 text-center">
                      <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                        <ImageIcon className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                        <span className="text-xs font-black text-slate-900 block">{booth.totalImages.toLocaleString('id-ID')}</span>
                        <span className="text-[10px] text-slate-400 block">Images</span>
                      </div>

                      <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                        <Video className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                        <span className="text-xs font-black text-slate-900 block">{booth.totalVideos.toLocaleString('id-ID')}</span>
                        <span className="text-[10px] text-slate-400 block">Videos</span>
                      </div>

                      <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                        <Camera className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                        <span className="text-xs font-black text-slate-900 block">{booth.totalSessions}</span>
                        <span className="text-[10px] text-slate-400 block">Sessions</span>
                      </div>

                      <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                        <TrendingUp className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                        <span className="text-xs font-black text-slate-900 block">{booth.avgPerDay}</span>
                        <span className="text-[10px] text-slate-400 block">Avg/Day</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Last Session time & "View Gallery" button */}
                <div className="p-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <span className="text-[10px] text-slate-400 block font-medium">Last Session:</span>
                    <span className="font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      {booth.lastSessionRelative}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedBooth(booth)}
                    className="py-2.5 px-5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    View Gallery
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ================= LEVEL 2: DETAILED MEDIA GALLERY FOR SELECTED BOOTH (IMAGE 2) ================= */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Back Button to Overview */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setSelectedBooth(null)}
              className="inline-flex items-center gap-2 py-2 px-3.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/90 shadow-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Gallery Overview</span>
            </button>

            <span className="text-xs text-slate-500 font-semibold">
              Viewing media for: <strong className="text-slate-900">{selectedBooth.name}</strong> ({selectedBooth.location})
            </span>
          </div>

          {/* Top 6 Stat Pills (Matching Image 2 Header) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Total Sessions */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black text-slate-900 block">{level2Stats.sessions}</span>
                <span className="text-[10px] text-slate-400 font-semibold block">Total Sessions</span>
              </div>
            </div>

            {/* Total Images */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black text-slate-900 block">{level2Stats.images.toLocaleString('id-ID')}</span>
                <span className="text-[10px] text-slate-400 font-semibold block">Total Images</span>
              </div>
            </div>

            {/* Total Videos */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black text-slate-900 block">{level2Stats.videos.toLocaleString('id-ID')}</span>
                <span className="text-[10px] text-slate-400 font-semibold block">Total Videos</span>
              </div>
            </div>

            {/* Shareable Sessions */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black text-slate-900 block">{level2Stats.shareable}</span>
                <span className="text-[10px] text-slate-400 font-semibold block">Shareable Sessions</span>
              </div>
            </div>

            {/* Not Shareable */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-black text-slate-900 block">{level2Stats.notShareable}</span>
                <span className="text-[10px] text-slate-400 font-semibold block">Not Shareable</span>
              </div>
            </div>

            {/* Latest Session */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block truncate">{level2Stats.latestTime}</span>
                <span className="text-[10px] text-slate-400 font-semibold block">Latest Session</span>
              </div>
            </div>
          </div>

          {/* Filter Bar (Matching Image 2: Start Date, End Date, Search, Frame, Blue Filter Button) */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {/* Start Date */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Search input */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Session ID, booth, event..."
                    className="w-full text-xs p-2.5 pr-8 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Frame select dropdown */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Frame</label>
                <select
                  value={selectedFrame}
                  onChange={(e) => setSelectedFrame(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium focus:bg-white focus:border-blue-600 focus:outline-none cursor-pointer"
                >
                  <option value="All Frames">All Frames</option>
                  <option value="KORAN 1">KORAN 1</option>
                  <option value="KORAN 2">KORAN 2</option>
                  <option value="BLACK 3">BLACK 3</option>
                  <option value="TUTUL LIPS">TUTUL LIPS</option>
                  <option value="PASTEL PINK">PASTEL PINK</option>
                </select>
              </div>

              {/* Blue Filter Button */}
              <button
                type="button"
                className="w-full py-2.5 px-5 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>

            {/* Retention Note & Selection Toolbar */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span>Rentang data aktif: <strong>2 Bulan Terakhir (60 Hari)</strong></span>
                <span className="text-slate-400">• Total {filteredSessions.length} sesi foto ditemukan</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSelectAll}
                  className="font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  {selectedSessionIds.length === filteredSessions.length ? 'Batal Pilih Semua' : 'Pilih Semua'}
                </button>
                {selectedSessionIds.length > 0 && (
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                    {selectedSessionIds.length} Terpilih
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Media Grid Cards (Matching Image 2: dark background, checkbox, status badge, date, frame badge) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSessions.map((session) => {
              const isChecked = selectedSessionIds.includes(session.id)
              return (
                <div
                  key={session.id}
                  onClick={() => setModalSession(session)}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    {/* Media Thumbnail Container with Checkbox & Status Badge */}
                    <div className="h-56 relative overflow-hidden bg-slate-900">
                      <img
                        src={session.thumbnailUrl}
                        alt={session.sessionCode}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Top-Left Selection Checkbox */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSelectSession(session.id)
                        }}
                        className={`absolute top-3 left-3 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'bg-white/80 border-slate-400 hover:bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      {/* Bottom-Left Status Badge (Image 2 style) */}
                      <div className="absolute bottom-3 left-3">
                        {session.status === 'Not Confirm' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#475569]/90 text-white backdrop-blur-xs shadow-xs">
                            Not Confirm
                          </span>
                        )}
                        {session.status === 'Not Shareable' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ef4444] text-white shadow-xs">
                            Not Shareable
                          </span>
                        )}
                        {session.status === 'Shareable' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#10b981] text-white shadow-xs">
                            Shareable
                          </span>
                        )}
                      </div>

                      {/* Video indicator icon if available */}
                      {session.hasVideo && (
                        <div className="absolute top-3 right-3 bg-black/60 text-white p-1 rounded-md">
                          <Video className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    {/* Card Body & Footer Info (Image 2 style) */}
                    <div className="p-4 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{session.capturedAt}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setModalSession(session)
                          }}
                          className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Frame Tag Badge in Purple/Blue pill (Image 2 style) */}
                      <div>
                        <span className="inline-block text-[10px] font-black px-2.5 py-0.5 rounded-md bg-[#ede9fe] text-[#6d28d9] uppercase tracking-wider">
                          {session.frameTag}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ================= MODAL PREVIEW DETAIL SESI FOTO ================= */}
      {modalSession && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 relative space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">
                  #{modalSession.sessionCode}
                </span>
                <span className="text-xs font-bold text-slate-700">{modalSession.frameTag}</span>
              </div>
              <button
                type="button"
                onClick={() => setModalSession(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Preview Container */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-950 aspect-[4/3]">
              <img
                src={modalSession.thumbnailUrl}
                alt={modalSession.sessionCode}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {modalSession.capturedAt}
              </span>
            </div>

            {/* Session details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Unit Photobooth:</span>
                <span className="font-bold text-slate-800">{modalSession.boothName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Status Izin Berbagi:</span>
                <span className={`font-bold ${modalSession.status === 'Shareable' ? 'text-emerald-600' : 'text-slate-700'}`}>
                  {modalSession.status}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Jumlah Lembar Cetak:</span>
                <span className="font-bold text-slate-800">{modalSession.copiesPrinted} Strip</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Masa Simpan Cloud:</span>
                <span className="font-bold text-blue-600">60 Hari (2 Bulan)</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleTriggerReprint(modalSession)}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-blue-600" />
                <span>Reprint</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  alert(`QR Code softfile ${modalSession.sessionCode} siap dibagikan ke pengunjung!`)
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>QR Download</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = modalSession.thumbnailUrl
                  link.download = `MEMOLAB_${modalSession.sessionCode}.jpg`
                  link.target = '_blank'
                  link.click()
                }}
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
