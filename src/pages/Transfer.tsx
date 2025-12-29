import { useState } from 'react';
import { useWallet } from '../hooks/useWallet';
import { ArrowRightLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn';

export default function Transfer() {
  // 1. Change transferFunds to transferMoney to match your Provider
  const { accounts, transferMoney } = useWallet(); 
  const [amount, setAmount] = useState('');
  const [fromAccount, setFromAccount] = useState('main-wallet');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const toAccount = fromAccount === 'main-wallet' ? 'savings-goal' : 'main-wallet';

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    setIsProcessing(true);
    setStatus('idle'); // Reset status on new attempt

    try {
      // 2. Call transferMoney here
      await transferMoney(fromAccount, toAccount, val);
      setStatus('success');
      setAmount('');
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error("Transfer error:", err);
      setStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="rounded-3xl border border-card-border bg-card p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground">Internal Transfer</h2>
          <p className="text-sm text-muted-foreground">Move funds instantly between your accounts.</p>
        </div>

        <form onSubmit={handleTransfer} className="space-y-6">
          {/* Account Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">From</label>
              <button
                type="button"
                onClick={() => setFromAccount('main-wallet')}
                className={cn(
                  "w-full p-4 rounded-2xl border text-left transition-all",
                  fromAccount === 'main-wallet' ? "border-orange-500 bg-orange-500/5" : "border-card-border hover:bg-muted"
                )}
              >
                <p className="text-xs font-medium text-muted-foreground">Main Wallet</p>
                <p className="text-lg font-bold text-foreground">₦{accounts[0].balance.toLocaleString()}</p>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">To</label>
              <div className="w-full p-4 rounded-2xl border border-card-border bg-muted/30">
                <p className="text-xs font-medium text-muted-foreground">
                  {toAccount === 'savings-goal' ? 'Savings Goal' : 'Main Wallet'}
                </p>
                <p className="text-lg font-bold text-foreground">
                  ₦{accounts.find(a => a.id === toAccount)?.balance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-1">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground/30">₦</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-4 text-3xl font-bold bg-muted/20 border border-card-border rounded-2xl focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || !amount}
            className="w-full relative h-14 overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF4D00] to-[#FF8C00] font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Confirm Transfer <ArrowRightLeft size={18} />
              </span>
            )}
          </button>

          {/* Status Feedback */}
          {status === 'success' && (
            <div className="flex items-center gap-2 text-emerald-500 justify-center animate-in fade-in zoom-in duration-300">
              <CheckCircle2 size={18} />
              <span className="text-sm font-medium">Transfer Successful!</span>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 justify-center animate-in shake duration-300">
              <AlertCircle size={18} />
              <span className="text-sm font-medium">Insufficient funds or error occurred.</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}