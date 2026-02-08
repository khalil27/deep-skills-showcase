import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Grid Background - All Pages */}
      <div className="grid-pattern" />
      
      <Header />
      <main className="flex-1 relative z-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
