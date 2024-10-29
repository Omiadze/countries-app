import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './layout';
import Skeleton from './pages/skeleton';
import NotFound from './pages/not-found';
import { Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LazyHomePage = lazy(() => import('./pages/home/views'));
const LazyAboutPage = lazy(() => import('./pages/about/views'));
const LazyContactPage = lazy(() => import('./pages/contact/views'));
const LazyOtpPage = lazy(() => import('./pages/otp/views'));

function App() {
  const [currentLang, setCurrentLang] = useState<'eng' | 'ka'>('eng');
  const navigate = useNavigate();

  const handleLanguageChange: () => void = () => {
    const newLang: 'eng' | 'ka' = currentLang === 'eng' ? 'ka' : 'eng';
    setCurrentLang(newLang);
    navigate(`/${newLang}/home`);
  };

  return (
    <>
      <Routes>
        <Route
          path="/:lang"
          element={
            <Layout
              currentLang={currentLang}
              handleLanguageChange={handleLanguageChange}
            />
          }
        >
          <Route
            path="home"
            element={
              <Suspense fallback={<Skeleton />}>
                <LazyHomePage />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<Skeleton />}>
                <LazyAboutPage />
              </Suspense>
            }
          />
          <Route
            path="otp"
            element={
              <Suspense fallback={<Skeleton />}>
                <LazyOtpPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<Skeleton />}>
                <LazyContactPage />
              </Suspense>
            }
          />
        </Route>
        <Route path="/" element={<Navigate to={`/${currentLang}/home`} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
