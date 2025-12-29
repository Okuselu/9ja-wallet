import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, CircleUser } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="mb-8 space-y-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em]">
        <Link to="/" className="hover:text-orange-500 transition-colors">9jaWallet </Link>
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
        {pathnames.length === 0 && <span className="text-foreground"> Dashboard</span>}
      </nav>

      {/* Welcome Message Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="mb-8 flex items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Welcome back, Madeenat !
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Your finances are looking healthy today.
            </p>
          </div>
        </div>
        
        <div className="mb-8 flex items-center gap-6 px-1">
          <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-muted border border-card-border">
          <CircleUser size={28} className="text-muted-foreground/60" strokeWidth={1.5} />
          </div>
        </div>
      </div>
    </header>
  );
}