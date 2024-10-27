import { Header } from '@components/header';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/footer/footer';

export const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
