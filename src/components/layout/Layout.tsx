import { useState, type ReactNode } from 'react';
import Sidebar from './sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar remains fixed on the left */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      {/* Main content shifted by 64px (the width of our sidebar) */}
      <main className="ml-64 min-h-screen transition-all duration-300">
        <div className="container mx-auto max-w-6xl px-8 py-10 animate-in fade-in slide-in-from-left-4 duration-700">
          {children}
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