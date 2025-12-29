import { useState, useMemo } from 'react';
import { useWallet } from '../hooks/useWallet';
import TransactionList from '../components/wallet/TransactionList';
import BalanceCard from '../components/wallet/BalanceCard';
import { Search, Filter } from 'lucide-react'; // 'Filter' is now used below

export default function Dashboard() {
  const { accounts, transactions, loading, preferences } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.merchant.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [transactions, searchTerm, selectedCategory]);

  if (loading) return <div className="p-8 animate-pulse text-muted-foreground">Loading Wallet...</div>;

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <BalanceCard 
            key={acc.id}
            name={acc.name}
            balance={acc.balance}
            isHidden={preferences.hideBalance}
            // FIX: Explicitly derive the 'type' to satisfy the BalanceCardProps interface
            type={acc.id.includes('savings') ? 'savings' : 'main'}
          />
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-end">
          <div className="w-full md:max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text"
              placeholder="Search merchants..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-card-border rounded-xl outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 bg-card border border-card-border rounded-xl px-3 py-2">
            <Filter size={16} className="text-muted-foreground" /> {/* FIX: Icon used here */}
            <select 
              className="bg-transparent outline-none text-sm font-medium pr-2 cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Transfer">Transfer</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.2em]">
            Recent Transactions ({filteredTransactions.length})
          </h2>
          <TransactionList transactions={filteredTransactions} />
        </div>
      </section>
    </div>
  );
}