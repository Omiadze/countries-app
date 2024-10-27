import { Header } from '@components/header';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/footer/footer';
interface LayoutProps {
  currentLang: 'eng' | 'ka'; // Specify the type more clearly if possible
  handleLanguageChange: () => void; // Change the parameter to be a function with no parameters
}

export const Layout: React.FC<LayoutProps> = ({
  currentLang,
  handleLanguageChange,
}) => {
  return (
    <div>
      <Header
        currentLang={currentLang}
        handleLanguageChange={handleLanguageChange}
      />
      <Outlet />
      <Footer />
    </div>
  );
};
