// frontend/src/components/Layout.tsx
import type { FC, ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t p-4 text-center text-sm text-gray-500">
        <p>ML Dashboard - Created for learning TypeScript, Node.js, and AWS</p>
      </footer>
    </div>
  );
};

export default Layout;