import { useState, type ReactNode } from 'react';
import Sidebar from './sidebar';
import { cn } from '../../utils/cn';
import { Menu, X } from 'lucide-react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);


  return (
    <div className="min-h-screen bg-background flex overflow-x-hidden">
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Mobile Top Bar - Only visible on small screens */}
      <div className="fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b border-card-border bg-background/80 px-4 backdrop-blur-md lg:hidden">
        <span className="font-bold tracking-tight">9jaWallet</span>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-muted-foreground">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Main content shifted by 64px (the width of our sidebar) */}
     <main className={cn(
  "flex-1 min-h-screen transition-all duration-300 ease-in-out pt-16 lg:pt-0",
  isCollapsed ? "lg:pl-20" : "lg:pl-64"
)}>
  <div className="mx-auto w-full max-w-[1400px] p-4 md:p-8 lg:p-12">
    <Header /> {/* 1. Breadcrumbs & Welcome First */}
    {children} {/* 2. Dashboard (Cards & Transactions) Second */}
  </div>
</main>
    </div>
  );
}

// import type { ReactNode } from 'react';
// import Navbar from './Navbar';

// interface LayoutProps {
//   children: ReactNode;
// }

// export default function Layout({ children }: LayoutProps) {
//   return (
//     // Changed bg-[#fafafa] to bg-background
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8 transition-opacity animate-in fade-in duration-700">
//         {children}
//       </main>
//     </div>
//   );
// }