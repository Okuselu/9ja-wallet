import { useWallet } from "../hooks/useWallet";
import TransactionList from "../components/wallet/TransactionList";

export default function Transactions() {
  const { transactions } = useWallet();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-10 animate-in fade-in duration-700">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-foreground">
          Transaction History
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage all your wallet activities ({transactions.length} total)
        </p>
      </header>
      <TransactionList initialLimit={10} showControls={true} />
    </div>
  );
}