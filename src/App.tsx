import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout } from "./layout";
import Skeleton from "./pages/skeleton";
import NotFound from "./pages/not-found";
import { Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const LazyHomePage = lazy(() => import("./pages/home/views"));
const LazyAboutPage = lazy(() => import("./pages/about/views"));
const LazyContactPage = lazy(() => import("./pages/contact/views"));

// export const LangContext = createContext();

function App() {
  const [currentLang, setCurrentLeng] = useState<string>("eng");
  const navigate = useNavigate(); // Add this line

  const handleLanguageChange = () => {
    const newLang = currentLang === "eng" ? "ka" : "eng";
    setCurrentLeng(newLang);
    navigate(`/${newLang}/home`); // Update the URL based on the new language
  };

  return (
    <>
      {/* Step 2: Wrap Routes with langContext.Provider */}

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
