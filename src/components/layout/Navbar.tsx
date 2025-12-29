import { Link, useLocation } from 'react-router-dom';
import { CreditCard, LayoutDashboard, SendHorizontal, Bell } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transfer', path: '/transfer', icon: SendHorizontal },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/75 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90">
            <div className="bg-slate-900 p-1.5 rounded-lg shadow-sm">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">9jaWallet</span>
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
                    ? "bg-slate-100 text-slate-900" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
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
          
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white shadow-sm">
            TO
          </div>
        </div>

      </div>
    </nav>
  );
}