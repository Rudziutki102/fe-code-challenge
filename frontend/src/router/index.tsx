import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
const StatementsView = lazy(() => import('@/components/StatementsView'));
const SymbolsView = lazy(() => import('@/components/SymbolsView'));
const ProfileView = lazy(() => import('@/components/ProfileView'));
const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<SymbolsView />} />
        <Route index path="profile" element={<ProfileView />} />
        <Route index path="statements" element={<StatementsView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
