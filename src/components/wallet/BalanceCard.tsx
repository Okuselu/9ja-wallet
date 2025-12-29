import type { ReactElement } from 'react';
import { Wallet, PiggyBank, ArrowUpRight, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useWallet } from '../../hooks/useWallet';

interface BalanceCardProps {
  name: string;
  balance: number;
  type: 'main' | 'savings';
  isHidden?: boolean;
}

export default function BalanceCard({ 
  name, 
  balance, 
  type, 
  isHidden = false 
}: BalanceCardProps): ReactElement {
  const isMain = type === 'main';
  
  const { toggleHideBalance } = useWallet();

  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl border p-6 transition-all duration-300",
      "bg-card border-card-border hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5"
    )}>
      {/* Brand Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4D00" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
      </svg>

      <div className="flex items-center justify-between mb-8">
        {/* Minimalist Icon with Brand Gradient */}
        <div className="flex h-6 w-6 items-center justify-center">
          {isMain ? (
            <Wallet size={24} stroke="url(#brand-gradient)" strokeWidth={1.5} />
          ) : (
            <PiggyBank size={24} stroke="url(#brand-gradient)" strokeWidth={1.5} />
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Interactive Privacy Toggle: 
            Always visible now. Directly triggers the global state.
          */}
          <button 
            onClick={() => toggleHideBalance()}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground/40 transition-colors"
            title={isHidden ? "Show balance" : "Hide balance"}
          >
            {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
          
          <div className="px-2 py-1 rounded-md bg-muted/50 border border-card-border/50">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
              {isMain ? "Main Account" : "Savings"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground/60">{name}</h3>
        
        <div className="text-3xl font-bold tracking-tight text-foreground flex items-baseline gap-1 min-h-[40px]">
          <span className="text-lg font-normal text-muted-foreground/40">₦</span>
          
          {/* UI reflects the global isHidden state passed from Dashboard */}
          <div className="flex-1 animate-in fade-in duration-300">
            {isHidden ? (
              <span className="tracking-[0.2em] font-mono text-muted-foreground/40 select-none pt-1">
                ••••••
              </span>
            ) : (
              <span>{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center text-emerald-500 font-medium text-xs">
            <ArrowUpRight size={14} className="mr-0.5" />
            2.5%
          </div>
          <span className="text-[11px] text-muted-foreground/50 italic">vs last month</span>
        </div>
      </div>
    </div>
  );
}