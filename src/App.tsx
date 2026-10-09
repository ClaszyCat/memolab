import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from './components/DashboardLayout'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { PhotoboothPage } from './pages/PhotoboothPage'
import { ReportAnalyticView } from './components/views/ReportAnalyticView'
import { DashboardView } from './components/views/DashboardView'
import { TemplateFrameView } from './components/views/TemplateFrameView'
import { CategoryFrameView } from './components/views/CategoryFrameView'
import { TransactionView } from './components/views/TransactionView'
import { FilterView } from './components/views/FilterView'
import { GalleryView } from './components/views/GalleryView'
import { BannerPromoView } from './components/views/BannerPromoView'
import { TutorialView } from './components/views/TutorialView'
import { DownloadAppView } from './components/views/DownloadAppView'
import { SubscriptionView } from './components/views/SubscriptionView'
import { UserManagementView } from './components/views/UserManagementView'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Customer Photobooth Touchscreen App */}
        <Route path="/booth" element={<PhotoboothPage />} />
        <Route path="/photobooth" element={<Navigate to="/booth" replace />} />

        {/* Dashboard Shell Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/report-analytic" replace />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/report-analytic" element={<ReportAnalyticView />} />
          <Route path="/transaction" element={<TransactionView />} />
          <Route path="/category-frame" element={<CategoryFrameView />} />
          <Route path="/template-frame" element={<TemplateFrameView />} />
          <Route path="/filter" element={<FilterView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/galery" element={<GalleryView />} />
          <Route path="/banner-promo" element={<BannerPromoView />} />
          <Route path="/tutorial" element={<TutorialView />} />
          <Route path="/download-app" element={<DownloadAppView />} />
          <Route path="/subscription" element={<SubscriptionView />} />
          <Route path="/user-management" element={<UserManagementView />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/report-analytic" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
