import { useWallet } from '../hooks/useWallet';
import TransactionList from '../components/wallet/TransactionList';
import BalanceCard from '../components/wallet/BalanceCard';

export default function Dashboard() {
  const { accounts, loading } = useWallet();

  if (loading) return <div className="p-8 animate-pulse text-muted-foreground">Loading Wallet...</div>;

  return (
    <div className="w-full space-y-12">
      {/* KEEP: The Balance Cards here as the primary dashboard content.
         REMOVE: Any "Welcome" or extra "Accounts" headers that are now in Header.tsx 
      */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((acc) => (
            <BalanceCard 
              key={acc.id}
              name={acc.name}
              balance={acc.balance}
              type={acc.id.includes('savings') ? 'savings' : 'main'}
            />
          ))}
        </div>
      </section>

      <section className="w-full">
        <h2 className="text-[10px] font-bold text-muted-foreground/50 mb-6 uppercase tracking-[0.2em]">
          Recent Transactions
        </h2>
        <TransactionList />
      </section>
    </div>
  );
}


// import { useWallet } from '../hooks/useWallet';
// import BalanceCard from '../components/wallet/BalanceCard';

// export default function Dashboard() {
//   const { accounts, loading } = useWallet();

//   if (loading) {
//     return (
//       <div className="flex h-[50vh] items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
//         <p className="text-slate-500">Manage your accounts and track your spending.</p>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {accounts.map((acc) => (
//           <BalanceCard 
//             key={acc.id}
//             name={acc.name}
//             balance={acc.balance}
//             type={acc.id.includes('savings') ? 'savings' : 'main'}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }