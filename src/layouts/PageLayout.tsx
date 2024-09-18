import Header from './Header';
import Footer from './Footer';

const PageLayout = ({
  children,
  mainClassName,
}: {
  children: React.ReactNode;
  mainClassName?: string;
}) => {
  return (
    <div>
      <Header />
      <main className={mainClassName}>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
