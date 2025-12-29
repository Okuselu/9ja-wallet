import type { ReactElement } from 'react';
import { Wallet, PiggyBank, ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BalanceCardProps {
  name: string;
  balance: number;
  type: 'main' | 'savings';
  className?: string; // Standard shadcn pattern: allow external classes
}

export default function BalanceCard({ 
  name, 
  balance, 
  type, 
  className 
}: BalanceCardProps): ReactElement {
  const isMain = type === 'main';

  return (
    // Now using cn to merge default styles with the 'type' logic and external props
    <div className={cn(
      "rounded-xl border p-6 shadow-sm transition-all hover:shadow-md",
      isMain ? "bg-white border-slate-200" : "bg-slate-50/50 border-dashed border-slate-300",
      className
    )}>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
          {name}
        </p>
        {isMain ? (
          <Wallet className="h-4 w-4 text-slate-400" />
        ) : (
          <PiggyBank className="h-4 w-4 text-slate-400" />
        )}
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold tracking-tight text-slate-900">
          ₦{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <span className={cn(
            "flex items-center font-medium",
            isMain ? "text-emerald-600" : "text-blue-600"
          )}>
            <ArrowUpRight className="h-3 w-3" /> {isMain ? '+2.5%' : 'Target: 80%'}
          </span>
          {isMain ? 'since last month' : 'of goal reached'}
        </p>
      </div>
    </div>
  );
}


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