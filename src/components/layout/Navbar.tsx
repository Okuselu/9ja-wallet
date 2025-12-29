import { Link, useLocation } from 'react-router-dom';
import { CreditCard, LayoutDashboard, SendHorizontal, Bell, Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../hooks/useTheme';


export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transfer', path: '/transfer', icon: SendHorizontal },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-card-border bg-background/75 backdrop-blur-lg transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-1">
            <CreditCard className="h-6 w-6" stroke="url(#brand-gradient)" strokeWidth={2} />
            </div>
            {/* Changed text-slate-900 to text-foreground */}
            <span className="text-xl font-bold tracking-tight text-foreground">9jaWallet</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
    location.pathname === item.path 
      ? "bg-muted text-foreground" // Use bg-muted instead of slate-100
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
  )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button 
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Toggle Theme"
          >
         {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
         </button>
          
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white shadow-sm">
            TO
          </div>
        </div>

      </div>
    </nav>
  );
}