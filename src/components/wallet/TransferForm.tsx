import { useState, type ChangeEvent } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TransferFormProps {
  onSuccess: () => void;
  fixedDestination?: string;
  defaultSource?: string;
}

export default function TransferForm({ onSuccess, fixedDestination, defaultSource }: TransferFormProps) {
  const { accounts, transferMoney } = useWallet();
  
  const MAIN_ID = "main-001";
  const SAVE_ID = "save-002";

  const [fromAccount] = useState(defaultSource || MAIN_ID);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const currentAccountData = accounts.find(a => a.id === fromAccount);
  const toAccountId = fixedDestination || (fromAccount === MAIN_ID ? SAVE_ID : MAIN_ID);

  // SANITIZATION LOGIC: Prevents anything except numbers and a single decimal
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // 1. Remove any malicious characters (XSS/Injection prevention)
    // Only allows digits and one dot
    const sanitized = rawValue.replace(/[^0-9.]/g, '');
    
    // 2. Prevent multiple decimals
    const parts = sanitized.split('.');
    if (parts.length > 2) return;

    // 3. Prevent negative sign (already covered by regex but double-checked)
    if (sanitized.includes('-')) return;

    setAmount(sanitized);
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation before processing
    const val = parseFloat(amount);
    
    if (isNaN(val) || val <= 0) {
      setErrorMessage("Please enter a positive amount");
      setStatus('error');
      return;
    }

    if (currentAccountData && val > currentAccountData.balance) {
      setErrorMessage(`Insufficient funds.`);
      setStatus('error');
      return;
    }

    setIsProcessing(true);
    setStatus('idle');

    try {
      // Logic would typically include a CSRF token or Transaction Pin check here
      await transferMoney(fromAccount, toAccountId, val);
      setStatus('success');
      setTimeout(() => onSuccess(), 1500);
    } catch {
      setErrorMessage("Transaction failed. System busy.");
      setStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleTransfer} className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="bg-muted/30 p-4 rounded-lg flex gap-3 items-start border border-card-border">
        <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Secure Transfer: Funds are moved internally between your verified wallets. 
          Verified encrypted transaction.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Amount (NGN)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-xl text-muted-foreground">₦</span>
          <input
            type="text" // Changed to text for better regex control
            inputMode="decimal"
            value={amount}
            onChange={handleAmountChange}
            placeholder="0.00"
            className="w-full pl-10 pr-4 py-4 bg-background border border-card-border rounded-lg text-2xl font-black focus:border-[#D31C31] outline-none transition-all"
            required
          />
        </div>
        {currentAccountData && (
          <div className="flex justify-between px-1">
             <p className="text-[10px] text-muted-foreground uppercase font-bold">
              Available: <span className="text-foreground">₦{currentAccountData.balance.toLocaleString()}</span>
            </p>
          </div>
        )}
      </div>

      <div className="space-y-2 pt-4">
        <button
          type="submit"
          disabled={isProcessing || !amount || parseFloat(amount) <= 0}
          className="w-full h-12 rounded-md bg-[#D31C31] text-white font-black text-sm hover:opacity-90 transition-all disabled:opacity-30 uppercase tracking-widest"
        >
          {isProcessing ? "Authorizing..." : "Confirm Transfer"}
        </button>
        
        <button
          type="button"
          onClick={onSuccess}
          className="w-full h-12 rounded-md bg-transparent border border-card-border font-bold text-sm text-muted-foreground hover:bg-muted transition-all"
        >
          Discard
        </button>
      </div>

      {/* Status Indicators */}
      {status !== 'idle' && (
        <div className={cn(
          "p-3 rounded-md flex items-center justify-center gap-2 animate-in fade-in zoom-in duration-300",
          status === 'success' ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
        )}>
          {status === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span className="text-xs font-bold uppercase tracking-wide">
            {status === 'success' ? "Transfer Success" : errorMessage}
          </span>
        </div>
      )}
    </form>
  );
}