import "./App.css";
import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/home/views";
import { Layout } from "./layout";
// import AboutPage from "./pages/about/views";
import { lazy, Suspense } from "react";
import Skeleton from "./pages/skeleton";
import NotFound from "./pages/not-found";
// import DetailsPage from "./pages/home/countrie-details-page/components/details-page";
// import ContactPage from "./pages/contact/views";
// import FavoritesPage from "./pages/favorites/views";

const LazyHomePage = lazy(() => import("./pages/home/views"));
const LazyAboutPage = lazy(() => import("./pages/about/views"));
const LazyContactPage = lazy(() => import("./pages/contact/views"));
const LazyFavoritesPage = lazy(() => import("./pages/favorites/views"));
const LazyDetailsPage = lazy(
  () => import("./pages/home/countrie-details-page/components/details-page")
);

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Skeleton />}>
                <LazyHomePage />
              </Suspense>
            }
          />
          <Route
            path="/country/:id"
            element={
              <Suspense fallback={<Skeleton />}>
                <LazyDetailsPage />
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
            path="favorites"
            element={
              <Suspense fallback={<Skeleton />}>
                <LazyFavoritesPage />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
