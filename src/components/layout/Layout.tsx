import type { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}