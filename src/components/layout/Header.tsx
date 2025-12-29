import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, CircleUser } from 'lucide-react'; // Changed to CircleUser for modern Lucide
import { cn } from '../../utils/cn';

export default function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="mb-8 space-y-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em]">
        <Link to="/" className="hover:text-orange-500 transition-colors">9jaWallet</Link>
        {pathnames.length > 0 && <ChevronRight size={10} />}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return (
            <div key={name} className="flex items-center space-x-2">
              <Link 
                to={routeTo} 
                className={cn(
                  "transition-colors",
                  isLast ? "text-foreground" : "hover:text-orange-500"
                )}
              >
                {name}
              </Link>
              {!isLast && <ChevronRight size={10} />}
            </div>
          );
        })}
        {pathnames.length === 0 && <span className="text-foreground">Dashboard</span>}
      </nav>

      {/* Welcome Message Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Using the previously unused icon here for a clean profile anchor */}
          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-muted border border-card-border">
            <CircleUser size={28} className="text-muted-foreground/60" strokeWidth={1.5} />
          </div>
          
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Welcome back, Tunde <span className="wave">👋</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Your finances are looking healthy today.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 px-1">
          <div className="text-right">
            <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">Status</p>
            <p className="text-sm font-semibold text-emerald-500 flex items-center gap-1.5 justify-end">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified
            </p>
          </div>
          <div className="h-8 w-px bg-card-border" />
          <div className="text-right">
            <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">Tier</p>
            <p className="text-sm font-semibold text-foreground">Premium Account</p>
          </div>
        </div>
      </div>
    </header>
  );
}

// import { useLocation, Link } from 'react-router-dom';
// import { ChevronRight, UserCircle } from 'lucide-react';

// export default function Header() {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   return (
//     <header className="mb-8 space-y-4">
//       {/* Breadcrumbs */}
//       <nav className="flex items-center space-x-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
//         <Link to="/" className="hover:text-foreground transition-colors">9jaWallet</Link>
//         {pathnames.length > 0 && <ChevronRight size={12} />}
//         {pathnames.map((name, index) => {
//           const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
//           const isLast = index === pathnames.length - 1;
//           return (
//             <div key={name} className="flex items-center space-x-2">
//               <Link 
//                 to={routeTo} 
//                 className={isLast ? "text-foreground font-bold" : "hover:text-foreground transition-colors"}
//               >
//                 {name}
//               </Link>
//               {!isLast && <ChevronRight size={12} />}
//             </div>
//           );
//         })}
//         {pathnames.length === 0 && <span className="text-foreground font-bold">Dashboard</span>}
//       </nav>

//       {/* Welcome Message */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
//             Welcome back, Tunde <span className="wave">👋</span>
//           </h1>
//           <p className="text-muted-foreground text-sm mt-1">
//             Here's what's happening with your accounts today.
//           </p>
//         </div>
        
//         {/* Quick Stats or Date could go here */}
//         <div className="hidden md:block text-right">
//           <p className="text-xs font-medium text-muted-foreground uppercase">Last login</p>
//           <p className="text-sm font-semibold text-foreground">Dec 29, 2025 • 08:45 AM</p>
//         </div>
//       </div>
//     </header>
//   );
// }