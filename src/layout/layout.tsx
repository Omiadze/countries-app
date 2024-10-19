import { Header } from "@components/header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/footer/footer";
import { createContext } from "react";

export const LangContext = createContext();

export const Layout = ({ currentLang, handleLanguageChange }) => {
  return (
    <LangContext.Provider value={{ currentLang, handleLanguageChange }}>
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </LangContext.Provider>
  );
};
