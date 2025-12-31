import { useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import { cn } from "../../utils/cn";
import { Search, ListFilter, ChevronLeft, ChevronRight, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import type { Transaction } from "../../@types/wallet.interface";

type Props = {
  transactions?: Transaction[];
  initialLimit?: number;
  showControls?: boolean;
};

export default function TransactionList({
  transactions,
  initialLimit,
  showControls = true,
}: Props) {
  const { transactions: ctxTransactions } = useWallet();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const itemsPerPage = initialLimit || 8;
  const baseData = transactions ?? ctxTransactions;

  const filteredData = baseData.filter((tx) => {
    const matchesSearch =
      tx.merchant?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || tx.type === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const displayData = [...filteredData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-4">
      {showControls && (
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex bg-[#6c757d] rounded-md p-1 self-start shadow-sm">
              {["Excel", "PDF", "Print"].map((label) => (
                <button key={label} className="px-4 py-1.5 text-[11px] font-bold text-white border-r border-white/20 last:border-0 hover:bg-white/10 transition-colors">
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="flex gap-1 bg-muted/30 p-1 rounded-xl border border-card-border">
                {["All", "Credit", "Debit"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                      activeCategory === cat ? "bg-card text-foreground shadow-sm border border-card-border" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search ref or type..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-background border border-card-border rounded-xl pl-10 pr-4 py-2 text-sm text-foreground outline-none focus:border-[#D31C31] transition-all"
                />
              </div>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-xs transition-all",
                  isFilterOpen ? "bg-[#D31C31] border-[#D31C31] text-white" : "bg-card border-card-border text-foreground hover:bg-muted"
                )}
              >
                <ListFilter size={16} />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-sm border border-card-border bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30 border-b border-card-border">
              <tr className="text-muted-foreground font-black text-[10px] uppercase tracking-widest whitespace-nowrap">
                <th className="px-6 py-4 text-left">Transaction Type</th>
                <th className="px-6 py-4 text-right">Sender Amount</th>
                <th className="px-6 py-4 text-right">Receiver Amount</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {displayData.map((tx, index) => (
                <tr key={tx.id} className={cn("transition-colors group", index % 2 === 0 ? "bg-transparent" : "bg-muted/5", "hover:bg-muted/10")}>
                  
                  {/* Transaction Type */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded flex items-center justify-center shrink-0",
                        tx.type === 'debit' ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"
                      )}>
                        {tx.type === 'debit' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-foreground capitalize">{tx.merchant || 'Transfer'}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">{tx.type}</p>
                      </div>
                    </div>
                  </td>

                  {/* Sender Amount (Debit) */}
                  <td className="px-6 py-4 text-right font-mono font-bold text-xs text-red-500">
                    {tx.type === 'debit' ? `₦${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '—'}
                  </td>

                  {/* Receiver Amount (Credit) */}
                  <td className="px-6 py-4 text-right font-mono font-bold text-xs text-emerald-500">
                    {tx.type === 'credit' ? `₦${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '—'}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-foreground font-medium text-xs">
                      {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase">
                      {new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-black text-foreground uppercase tracking-wider">Successful</span>
                    </div>
                  </td>

                  {/* Reference */}
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-card-border uppercase">
                      {tx.id.slice(0, 12)}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-muted/10 border-t border-card-border flex items-center justify-between">
          <p className="text-[11px] text-muted-foreground font-medium">Page {currentPage} of {Math.max(1, totalPages)}</p>
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 rounded-md border border-card-border hover:bg-muted disabled:opacity-20 transition-colors text-foreground">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages} className="p-1.5 rounded-md border border-card-border hover:bg-muted disabled:opacity-20 transition-colors text-foreground">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}