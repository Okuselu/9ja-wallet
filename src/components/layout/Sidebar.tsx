import { Link, useLocation } from 'react-router-dom';
import { 
  CreditCard, LayoutDashboard, SendHorizontal, 
  Sun, Moon, Settings, ChevronLeft, ChevronRight 
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
        {/* The Edge Toggle - Repositioned to the right border */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 hidden h-6 w-6 items-center justify-center rounded-full border border-card-border bg-card text-muted-foreground shadow-sm hover:text-foreground lg:flex"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className="flex h-full flex-col justify-between px-3 py-6">
          <div>
            <div className={cn("mb-10 flex items-center px-2", isCollapsed ? "justify-center" : "gap-3")}>
              <CreditCard size={28} stroke="url(#brand-gradient)" strokeWidth={2.5} className="shrink-0" />
              {!isCollapsed && (
                <span className="text-xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-left-2">
                  9jaWallet
                </span>
              )}
            </div>

            <nav className="space-y-1.5">
              {[
                { name: 'Dashboard', path: '/', icon: LayoutDashboard },
                { name: 'Transfer', path: '/transfer', icon: SendHorizontal },
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
                      isActive ? "bg-orange-500/10 text-orange-600" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    <item.icon size={20} stroke={isActive ? "url(#brand-gradient)" : "currentColor"} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-2 border-t border-card-border pt-6">
            <button onClick={toggleTheme} className={cn("flex w-full items-center py-2 text-muted-foreground", isCollapsed ? "justify-center" : "space-x-3 px-3")}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              {!isCollapsed && <span className="text-sm">Theme</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}