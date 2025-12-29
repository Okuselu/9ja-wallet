import { Link, useLocation } from 'react-router-dom';
import { CreditCard, LayoutDashboard, SendHorizontal } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Transfer', path: '/transfer', icon: SendHorizontal },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-8 flex items-center space-x-2">
          <div className="bg-slate-900 p-1.5 rounded-lg">
             <CreditCard className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">9jaWallet</span>
        </div>
        
        <div className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 transition-colors hover:text-slate-900 ${
                location.pathname === item.path ? 'text-slate-900' : 'text-slate-500'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-300">
            TO
          </div>
        </div>
      </div>
    </nav>
  );
}