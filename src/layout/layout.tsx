import { Header } from '@components/header';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/footer/footer';
import { createContext } from 'react';

interface Props {
  currentLang: string;
  handleLanguageChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const defaultLangContext: Props = {
  currentLang: 'eng',
  handleLanguageChange: () => {},
};

export const LangContext = createContext<Props>(defaultLangContext);

export const Layout: React.FC<Props> = ({
  currentLang,
  handleLanguageChange,
}) => {
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
