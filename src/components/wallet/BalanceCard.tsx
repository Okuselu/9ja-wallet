import type { ReactElement } from 'react'
import { useState } from 'react'
import { Wallet, PiggyBank, ArrowUpRight, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BalanceCardProps {
  name: string;
  balance: number;
  type: 'main' | 'savings';
  isHidden?: boolean; // Added preference prop
}

export default function BalanceCard({ 
  name, 
  balance, 
  type, 
  isHidden = false // Default to false if not provided
}: BalanceCardProps): ReactElement {
  const [isPeeking, setIsPeeking] = useState(false); // Local state for temporary reveal
  const isMain = type === 'main';

  // Define logic to show balance if either globally visible OR locally "peeking"
  const shouldShowBalance = !isHidden || isPeeking;

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
          {/* Interactive Privacy Toggle (Fixes Eye/EyeOff ESLint error) */}
          {isHidden && (
            <button 
              onClick={() => setIsPeeking(!isPeeking)}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground/40 transition-colors"
              title={isPeeking ? "Hide balance" : "Reveal balance"}
            >
              {isPeeking ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          )}
          
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
          
          {/* Conditional Logic for Masking with smooth transition */}
          <div className="flex-1 animate-in fade-in duration-300">
            {shouldShowBalance ? (
              <span>{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            ) : (
              <span className="tracking-[0.2em] font-mono text-muted-foreground/40 select-none pt-1">
                ••••••
              </span>
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
// import type { ReactElement } from 'react';
// import { Wallet, PiggyBank, ArrowUpRight } from 'lucide-react';
// import { cn } from '../../utils/cn';

// interface BalanceCardProps {
//   name: string;
//   balance: number;
//   type: 'main' | 'savings';
//   className?: string; // Standard shadcn pattern: allow external classes
// }

// export default function BalanceCard({ 
//   name, 
//   balance, 
//   type
// }: BalanceCardProps): ReactElement {
//   const isMain = type === 'main';

//   return (
//     // Now using cn to merge default styles with the 'type' logic and external props
//     <div className={cn(
//       "rounded-xl border p-6 shadow-sm transition-all hover:shadow-md", "bg-card border-card-border)",
//       isMain && "bg-muted/50 border-dashed"
//     )}>
//       <div className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
//           {name}
//         </p>
//         {isMain ? (
//           <Wallet className="h-4 w-4 text-slate-400" />
//         ) : (
//           <PiggyBank className="h-4 w-4 text-slate-400" />
//         )}
//       </div>
//       <div className="mt-2">
//         <div className="text-2xl font-bold tracking-tight text-foreground"> {/* Changed text-slate-900 */}
//     ₦{balance.toLocaleString()}
//   </div>
//         <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
//           <span className={cn(
//             "flex items-center font-medium",
//             isMain ? "text-emerald-600" : "text-blue-600"
//           )}>
//             <ArrowUpRight className="h-3 w-3" /> {isMain ? '+2.5%' : 'Target: 80%'}
//           </span>
//           {isMain ? 'since last month' : 'of goal reached'}
//         </p>
//       </div>
//     </div>
//   );
// }


// import type { ReactElement } from 'react';
// import { ArrowUpRight, Wallet } from 'lucide-react';

// interface BalanceCardProps {
//   name: string;
//   balance: number;
//   type: 'main' | 'savings';
// }

// export default function BalanceCard({ name, balance, type }: BalanceCardProps): ReactElement {
//   const isMain = type === 'main';

//   return (
//     <div className="rounded-xl border border-slate-200 bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex items-center justify-between space-y-0 pb-2">
//         <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
//           {name}
//         </p>
//         <Wallet className="h-4 w-4 text-slate-400" />
//       </div>
//       <div className="flex items-baseline space-x-2 mt-2">
//         <h2 className="text-3xl font-bold tracking-tight text-slate-900">
//           ₦{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
//         </h2>
//       </div>
//       <div className="mt-4 flex items-center text-xs font-medium">
//         {isMain ? (
//           <span className="flex items-center text-emerald-600">
//             <ArrowUpRight className="mr-1 h-3 w-3" />
//             +2.5% from last month
//           </span>
//         ) : (
//           <span className="text-slate-400">Target: ₦1.5M</span>
//         )}
//       </div>
//     </div>
//   );
// }