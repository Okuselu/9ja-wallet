import { Link, useLocation } from 'react-router-dom';
import { 
  CreditCard, LayoutDashboard, 
  Sun, Moon, Settings, ChevronLeft, ChevronRight,
  History 
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../hooks/useTheme';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={cn(
          "fixed left-0 top-0 z-50 h-screen border-r border-card-border bg-card transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* The Edge Toggle */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 hidden h-6 w-6 items-center justify-center rounded-full border border-card-border bg-card text-muted-foreground shadow-sm hover:text-foreground lg:flex"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className="flex h-full flex-col justify-between px-3 py-6">
          <div>
            {/* Logo Section */}
            <div className={cn(
              "mb-10 flex items-center px-2 transition-all duration-300", 
              isCollapsed ? "justify-center" : "gap-3"
            )}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF4D00] to-[#FF8C00] shadow-lg shadow-orange-500/20">
                <CreditCard size={22} className="text-white" />
              </div>

              {!isCollapsed && (
                <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-500">
                  <span className="text-lg font-bold leading-none tracking-tight text-foreground">
                    9ja<span className="text-[#FF4D00]">Wallet</span>
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-1">
                    Personal
                  </span>
                </div>
              )}
            </div>

            <nav className="space-y-1.5">
              {[
                { name: 'Dashboard', path: '/', icon: LayoutDashboard },
                { name: 'Transactions', path: '/transactions', icon: History }, // - Added Transactions link
                { name: 'Settings', path: '/settings', icon: Settings },
              ].map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all",
                      isCollapsed ? "justify-center" : "space-x-3",
                      isActive 
                        ? "bg-orange-500/10 text-orange-600" 
                        : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon size={20} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-2 border-t border-card-border pt-6">
            <button 
              onClick={toggleTheme} 
              className={cn(
                "flex w-full items-center py-2 text-muted-foreground transition-colors hover:text-foreground", 
                isCollapsed ? "justify-center" : "space-x-3 px-3"
              )}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              {!isCollapsed && <span className="text-sm">Theme</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}