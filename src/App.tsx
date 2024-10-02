import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/views";
import { Layout } from "./layout";
import AboutPage from "./pages/about/views";
import { Suspense } from "react";
import Skeleton from "./pages/skeleton";
import ContactPage from "./pages/contact/views";
import FavoritesPage from "./pages/favorites/views";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Skeleton />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route path="about" element={<AboutPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
