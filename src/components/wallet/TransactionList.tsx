import { useMemo, useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function TransactionList() {
  const { transactions } = useWallet();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return transactions.filter(t => 
      t.merchant.toLowerCase().includes(query.toLowerCase()) ||
      t.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [transactions, query]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input 
          type="text"
          placeholder="Filter transactions..."
          className="w-full md:w-80 pl-10 pr-4 py-2 text-sm bg-card border border-card-border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-foreground"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="rounded-md border border-card-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b border-card-border">
            <tr className="text-muted-foreground font-medium">
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Merchant</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border">
            {filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4 text-muted-foreground">
                  {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </td>
                <td className="px-4 py-4 font-medium text-foreground">{tx.merchant}</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 capitalize">
                    {tx.category}
                  </span>
                </td>
                <td className={cn(
                  "px-4 py-4 text-right font-semibold",
                  tx.type === 'debit' ? "text-foreground" : "text-emerald-500"
                )}>
                  {tx.type === 'debit' ? '-' : '+'}₦{tx.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}