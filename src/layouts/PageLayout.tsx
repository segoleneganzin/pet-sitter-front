import { useEffect, useState } from 'react';
import ScrollUp from '../components/ScrollUp';
import AppNavigation from './AppNavigation';
import Footer from './Footer';
import Header from './Header';

interface I_PageLayoutProps {
  children: React.ReactNode;
  mainClassName?: string;
}

const PageLayout: React.FC<I_PageLayoutProps> = ({
  children,
  mainClassName,
}) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const showScrollButtonThreshold = 500;
    setShowScrollButton(scrollPosition > showScrollButtonThreshold);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  }, [showScrollButton]);

  return (
    <div className='page-layout'>
      <Header />
      <AppNavigation />
      <main className={mainClassName}>{children}</main>
      {showScrollButton && <ScrollUp />}
      {/* only display on desktop */}
      <Footer />
    </div>
  );
};

export default PageLayout;
