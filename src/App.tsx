import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PageLoading } from './components/ui/Loading';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(m => ({ default: m.SignupPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const AssistantPage = lazy(() => import('./pages/AssistantPage').then(m => ({ default: m.AssistantPage })));
const SchemesPage = lazy(() => import('./pages/SchemesPage').then(m => ({ default: m.SchemesPage })));
const DocumentsPage = lazy(() => import('./pages/DocumentsPage').then(m => ({ default: m.DocumentsPage })));
const ReportPage = lazy(() => import('./pages/ReportPage').then(m => ({ default: m.ReportPage })));
const ComplaintsPage = lazy(() => import('./pages/ComplaintsPage').then(m => ({ default: m.ComplaintsPage })));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route
                path="/login"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <LoginPage />
                  </Suspense>
                }
              />
              <Route
                path="/signup"
                element={
                  <Suspense fallback={<PageLoading />}>
                    <SignupPage />
                  </Suspense>
                }
              />

              {/* Protected routes */}
              <Route
                element={<DashboardLayout />}
              >
                <Route
                  path="/dashboard"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <DashboardPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/assistant"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <AssistantPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/schemes"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <SchemesPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/documents"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <DocumentsPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/report"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <ReportPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/complaints"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <ComplaintsPage />
                    </Suspense>
                  }
                />
              </Route>

              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
