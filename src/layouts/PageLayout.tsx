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
  return (
    <div className='page-layout'>
      <Header />
      <AppNavigation />
      <main className={mainClassName}>{children}</main>
      {/* only display on desktop */}
      <Footer />
    </div>
  );
};

export default PageLayout;
