import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { LoadingProvider, useLoading } from './LoadingContext';
import LoadingScreen from './LoadingScreen';
import Layout from './Layout';
import Login from './pages/Login';

// Lazy-load all pages so they're only fetched when needed
const DashboardAdmin            = lazy(() => import('./pages/DashboardAdmin'));
const StudentDataMap            = lazy(() => import('./pages/StudentDataMap'));
const Reports                   = lazy(() => import('./pages/Reports'));
const Search                    = lazy(() => import('./pages/Search'));
const SubjectsMap               = lazy(() => import('./pages/SubjectsMap'));
const ViolationsMap             = lazy(() => import('./pages/ViolationsMap'));
const AffiliationsMap           = lazy(() => import('./pages/AffiliationsMap'));
const SkillsMap                 = lazy(() => import('./pages/SkillsMap'));
const AcademicRecordsMap        = lazy(() => import('./pages/AcademicRecordsMap'));
const NonAcademicHistoriesMap   = lazy(() => import('./pages/NonAcademicHistoriesMap'));
const DashboardStudent          = lazy(() => import('./pages/DashboardStudent'));
const ChangePassword            = lazy(() => import('./pages/ChangePassword'));
const StudentSkills             = lazy(() => import('./pages/StudentSkills'));
const StudentAffiliations       = lazy(() => import('./pages/StudentAffiliations'));
const StudentNonAcademicActivities = lazy(() => import('./pages/StudentNonAcademicActivities'));

const PageFallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#78716c', fontFamily: "'Inter',sans-serif" }}>
    Loading…
  </div>
);

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: "'Inter',sans-serif", color: '#78716c' }}>Loading…</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user, role } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/*" element={
        <PrivateRoute>
          <Layout>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                {/* ── Admin ── */}
                {role === 'admin' && <>
                  <Route path="/" element={<DashboardAdmin />} />
                  <Route path="/student-map" element={<StudentDataMap />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/subjects" element={<SubjectsMap />} />
                  <Route path="/violations" element={<ViolationsMap />} />
                  <Route path="/affiliations" element={<AffiliationsMap />} />
                  <Route path="/skills" element={<SkillsMap />} />
                  <Route path="/academic-records" element={<AcademicRecordsMap />} />
                  <Route path="/non-academic-histories" element={<NonAcademicHistoriesMap />} />
                </>}

                {/* ── Student ── */}
                {role === 'student' && <>
                  <Route path="/" element={<DashboardStudent />} />
                  <Route path="/my-skills" element={<StudentSkills />} />
                  <Route path="/my-affiliations" element={<StudentAffiliations />} />
                  <Route path="/my-activities" element={<StudentNonAcademicActivities />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                </>}

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </PrivateRoute>
      } />
    </Routes>
  );
}

function AppInner() {
  const { visible, onDoneRef } = useLoading();
  return (
    <>
      {visible && <LoadingScreen onDone={onDoneRef?.current} />}
      <AppRoutes />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <AppInner />
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
