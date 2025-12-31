import { useState, useEffect } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { Clipboard, User, AlertCircle, Wallet, ChevronDown } from 'lucide-react';

export default function ExternalTransferForm({ onSuccess }: { onSuccess: () => void }) {
  const { accounts, transferMoney } = useWallet();
  
  const mainAccount = accounts.find(a => a.id === "main-001");
  const availableBalance = mainAccount?.balance || 0;

  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accountNumber.length !== 10 || bank === '') {
      setAccountName('');
      return;
    }

    let isMounted = true;
    setIsValidating(true);

    const timer = setTimeout(() => {
      if (isMounted) {
        setAccountName("SAMUEL ADEKUNLE JOSHUA");
        setIsValidating(false);
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [accountNumber, bank]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const digits = text.replace(/\D/g, '').slice(0, 10);
      setAccountNumber(digits);
    } catch {
      console.error("Failed to read clipboard");
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const transferAmount = parseFloat(amount);

    if (isNaN(transferAmount) || transferAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (transferAmount > availableBalance) {
      setError("Insufficient funds in your main account.");
      return;
    }

    setIsProcessing(true);
    
    try {
      await transferMoney("main-001", "external-target", transferAmount);
      onSuccess();
    } catch {
      setError("Transfer failed. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

return (
    <form onSubmit={handleTransfer} className="space-y-6 animate-in slide-in-from-right duration-500">
      
      {/* Available Balance Badge */}
      <div className="flex justify-end px-1">
        <div className="flex items-center gap-2 bg-orange-500/5 border border-orange-500/10 px-3 py-1.5 rounded-lg">
          <Wallet size={12} className="text-orange-600/70" />
          <span className="text-[10px] font-bold text-orange-600/70 uppercase tracking-wider">Available:</span>
          <span className="text-xs font-black text-orange-700">₦{availableBalance.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Bank Selection - UPDATED UI */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Select Bank</label>
          <div className="relative">
            <select 
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full bg-background border border-card-border rounded-md px-4 py-3 text-sm outline-none focus:border-[#D31C31] transition-all appearance-none cursor-pointer"
              required
            >
              <option value="">Choose a bank...</option>
              <option value="access">Access Bank</option>
              <option value="gtb">GTBank</option>
              <option value="zenith">Zenith Bank</option>
              <option value="kuda">Kuda Bank</option>
            </select>
            {/* Custom Chevron to match Paste icon position/style */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground p-1.5">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Account Number */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Account Number</label>
          <div className="relative">
            <input
              type="text"
              maxLength={10}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="0123456789"
              className="w-full bg-background border border-card-border rounded-md pl-4 pr-12 py-3 text-sm outline-none focus:border-[#D31C31] transition-all font-mono"
              required
            />
            <button 
              type="button"
              onClick={handlePaste}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D31C31] hover:bg-[#D31C31]/5 p-1.5 rounded-md transition-all"
            >
              <Clipboard size={16} />
            </button>
          </div>
        </div>
        

        {/* Account Validation Indicator */}
        {(isValidating || accountName) && (
          <div className="p-3 bg-emerald-500/[0.03] border border-emerald-500/10 rounded-md flex items-center gap-3 animate-in zoom-in duration-300">
            {isValidating ? (
              <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold">
                <div className="w-3 h-3 border-2 border-t-transparent border-[#D31C31] rounded-full animate-spin" />
                Validating details...
              </div>
            ) : (
              <>
                <div className="w-8 h-8 bg-emerald-500/10 text-emerald-500 rounded-md flex items-center justify-center">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-[9px] text-muted-foreground font-black uppercase leading-none mb-1">Receiver</p>
                  <p className="text-xs font-bold text-foreground leading-none">{accountName}</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Amount Input */}
        <div className="space-y-1.5 pt-2">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₦</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-4 bg-background border border-card-border rounded-md text-xl font-black outline-none focus:border-[#D31C31] transition-all"
              required
            />
          </div>
        </div>
      </div>

      {/* Dynamic Error Messaging */}
      {error && (
        <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-md flex items-center gap-2 text-red-600 animate-in shake duration-300">
          <AlertCircle size={14} />
          <span className="text-[11px] font-bold uppercase tracking-tight">{error}</span>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 space-y-3">
        <button
          type="submit"
          disabled={isProcessing || !accountName || !amount}
          className="w-full h-14 bg-[#D31C31] text-white rounded-md font-black text-xs uppercase tracking-[0.15em] hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-20 shadow-lg shadow-red-900/10"
        >
          {isProcessing ? "Processing..." : "Authorize Transfer"}
        </button>
        <button
          type="button"
          onClick={onSuccess}
          className="w-full h-12 text-muted-foreground rounded-md font-bold text-xs uppercase tracking-widest hover:bg-muted transition-colors"
        >
          Go Back
        </button>
      </div>
    </form>
  );
}