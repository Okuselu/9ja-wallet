import { useLocation, Link } from "react-router-dom";
import { ChevronRight, CircleUser } from "lucide-react"; // CircleUser is now used
import { cn } from "../../utils/cn";

export default function Header() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <header className="mb-8 flex items-center justify-between">
      {/* Breadcrumbs (Left) */}
      <nav className="flex items-center space-x-2 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em]">
        <Link to="/" className="hover:text-orange-500 transition-colors">
          9jaWallet{" "}
        </Link>
        {pathnames.length > 0 && <ChevronRight size={10} />}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
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
        {pathnames.length === 0 && (
          <span className="text-foreground"> Dashboard</span>
        )}
      </nav>

      {/* User Profile Trigger (Right) */}
      <div className="flex items-center gap-3 bg-card border border-card-border px-3 py-1.5 rounded-full shadow-sm">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-bold text-foreground leading-none">
            Kate Durojaiye
          </p>
          <p className="text-[8px] text-muted-foreground uppercase tracking-wider">
            Premium Account
          </p>
        </div>
        <div className="p-1.5 bg-muted rounded-full text-muted-foreground">
          <CircleUser size={20} />
        </div>
      </div>
    </header>
  );
}
