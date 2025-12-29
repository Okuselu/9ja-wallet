import { useWallet } from '../../hooks/useWallet';
import { cn } from '../../utils/cn';
import type { Transaction } from '../../@types/wallet.interface';

type Props = {
  transactions?: Transaction[];
};

export default function TransactionList({ transactions }: Props) {
  // Pull preferences to handle the "Hide Balance" requirement
  const { transactions: ctxTransactions, preferences } = useWallet();

  // Use the passed filtered transactions, or fall back to context
  const displayData = transactions ?? ctxTransactions;

  return (
    <div className="rounded-2xl border border-card-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b border-card-border">
          <tr className="text-muted-foreground font-medium text-[10px] uppercase tracking-wider">
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Merchant</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-card-border">
          {displayData.map((tx) => (
            <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-4 text-muted-foreground text-xs">
                {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </td>
              <td className="px-4 py-4 font-medium text-foreground">{tx.merchant}</td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-muted-foreground uppercase">
                  {tx.category}
                </span>
              </td>
              <td className={cn(
                "px-4 py-4 text-right font-bold",
                tx.type === 'debit' ? "text-foreground" : "text-emerald-500"
              )}>
                {/* Requirement Check: Respect the 'Hide Balance' privacy setting 
                */}
                {preferences.hideBalance ? (
                  <span className="tracking-widest">••••••</span>
                ) : (
                  <>
                    {tx.type === 'debit' ? '-' : '+'}₦{tx.amount.toLocaleString()}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {displayData.length === 0 && (
        <div className="p-8 text-center text-muted-foreground/50 text-xs italic">
          No transactions match your filters.
        </div>
      )}
    </div>
  );
}