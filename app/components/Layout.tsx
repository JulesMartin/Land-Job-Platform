'use client';

import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './footer';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      {isHomePage ? (
        <>{children}</>
      ) : (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
          {children}
        </main>
      )}
      <Footer />
    </div>
  );
}
