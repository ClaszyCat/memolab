export type MenuKey =
  | 'dashboard'
  | 'report-analytic'
  | 'transaction'
  | 'category-frame'
  | 'template-frame'
  | 'filter'
  | 'gallery'
  | 'banner-promo'
  | 'tutorial'
  | 'download-app'
  | 'subscription'
  | 'user-management'

export interface MenuItem {
  id: MenuKey
  label: string
  subtext?: string
  icon: string
  badge?: string
}

export interface KioskStatus {
  id: string
  name: string
  location: string
  status: 'online' | 'offline' | 'busy' | 'warning'
  paperLevel: number
  inkLevel: number
  todayPrints: number
  lastPing: string
}

export interface TransactionRecord {
  id: string
  kiosk: string
  timestamp: string
  customer: string
  templateName: string
  category: string
  copies: number
  totalAmount: number
  paymentMethod: 'QRIS' | 'Cash' | 'Debit'
  status: 'Completed' | 'Pending' | 'Failed'
  thumbnail: string
}

export interface FrameTemplate {
  id: string
  name: string
  category: string
  dimensions: string
  slots: number
  popularScore: number
  isActive: boolean
  previewUrl: string
  accentColor: string
}
