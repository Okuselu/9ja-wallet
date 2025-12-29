import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { ArrowRightLeft, CheckCircle2, AlertCircle, Wallet, PiggyBank } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Transfer() {
  const { accounts, transferMoney } = useWallet(); 
  
  // 1. Match IDs exactly with your accounts.json
  const MAIN_ID = "main-001";
  const SAVE_ID = "save-002";

  const [fromAccount, setFromAccount] = useState(MAIN_ID);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // 2. Locate account data from state
  const mainAccount = accounts.find(a => a.id === MAIN_ID);
  const savingsAccount = accounts.find(a => a.id === SAVE_ID);
  
  const currentAccountData = fromAccount === MAIN_ID ? mainAccount : savingsAccount;
  const toAccountId = fromAccount === MAIN_ID ? SAVE_ID : MAIN_ID;

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    
    // Validation Logic
    if (isNaN(val) || val <= 0) {
      setErrorMessage("Please enter a valid amount");
      setStatus('error');
      return;
    }

    if (currentAccountData && val > currentAccountData.balance) {
      setErrorMessage(`Insufficient funds. Available: ₦${currentAccountData.balance.toLocaleString()}`);
      setStatus('error');
      return;
    }

    if (amount.includes('.') && amount.split('.')[1].length > 2) {
      setErrorMessage("Maximum 2 decimal places allowed");
      setStatus('error');
      return;
    }

    setIsProcessing(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      // 3. This triggers the Optimistic Update in your Reducer
      await transferMoney(fromAccount, toAccountId, val);
      
      setStatus('success');
      setAmount('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setErrorMessage("Transaction failed. Please try again.");
      setStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="rounded-3xl border border-card-border bg-card p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h2 className="text-xl font-bold text-foreground">Move Money</h2>
          <p className="text-sm text-muted-foreground">Internal transfer between your wallets</p>
        </div>

        <form onSubmit={handleTransfer} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">Select Source</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Main Wallet Selector */}
              <button
                type="button"
                onClick={() => { setFromAccount(MAIN_ID); setStatus('idle'); }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                  fromAccount === MAIN_ID ? "border-orange-500 bg-orange-500/5 ring-1 ring-orange-500" : "border-card-border bg-muted/20 hover:bg-muted"
                )}
              >
                <div className={cn("p-2 rounded-lg", fromAccount === MAIN_ID ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground")}>
                  <Wallet size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium opacity-70">Main Wallet</p>
                  <p className="text-sm font-bold">₦{mainAccount?.balance.toLocaleString()}</p>
                </div>
              </button>

              {/* Savings Selector */}
              <button
                type="button"
                onClick={() => { setFromAccount(SAVE_ID); setStatus('idle'); }}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                  fromAccount === SAVE_ID ? "border-orange-500 bg-orange-500/5 ring-1 ring-orange-500" : "border-card-border bg-muted/20 hover:bg-muted"
                )}
              >
                <div className={cn("p-2 rounded-lg", fromAccount === SAVE_ID ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground")}>
                  <PiggyBank size={20} />
                </div>
                <div>
                  <p className="text-xs font-medium opacity-70">Savings Goal</p>
                  <p className="text-sm font-bold">₦{savingsAccount?.balance.toLocaleString()}</p>
                </div>
              </button>
            </div>
          </div>

          <div className="flex justify-center -my-4 relative z-10">
            <div className="bg-card border border-card-border p-2 rounded-full shadow-md">
              <ArrowRightLeft size={20} className="text-orange-500" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-muted/30 border border-dashed border-card-border text-center">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Destination</p>
            <p className="text-sm font-semibold text-foreground">
              To: <span className="text-orange-500">{fromAccount === MAIN_ID ? 'Savings Goal' : 'Main Wallet'}</span>
            </p>
          </div>

          <div className="space-y-3 text-center">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Amount to Transfer</label>
            <div className="relative max-w-[280px] mx-auto">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl font-bold text-muted-foreground/30">₦</span>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-2 py-4 text-4xl font-bold bg-transparent border-b-2 border-card-border focus:border-orange-500 outline-none transition-colors text-center text-foreground"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing || !amount}
            className="w-full h-16 rounded-2xl bg-gradient-to-r from-[#FF4D00] to-[#FF8C00] font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          >
            {isProcessing ? "Processing..." : "Confirm Transfer"}
          </button>

          <div className="min-h-[32px] text-center">
            {status === 'success' && (
              <div className="flex items-center gap-2 text-emerald-500 justify-center animate-in zoom-in duration-300">
                <CheckCircle2 size={18} />
                <span className="text-sm font-bold">Transfer Successful!</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-500 justify-center animate-in shake duration-300">
                <AlertCircle size={18} />
                <span className="text-sm font-bold">{errorMessage}</span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}