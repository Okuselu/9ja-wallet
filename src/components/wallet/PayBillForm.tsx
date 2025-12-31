import { useState } from 'react';
import { Search, Info } from 'lucide-react';

export default function PayBillForm() {
  const [biller, setBiller] = useState('');
  const [customerId, setCustomerId] = useState('012324532');
  const [amount, setAmount] = useState('');

  const handlePayBill = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for bill payment would go here
    console.log("Paying bill:", { biller, customerId, amount });
    alert("Bill payment successful!");
  };

  return (
    <form onSubmit={handlePayBill} className="space-y-6 animate-in slide-in-from-right duration-500">
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">Choose a Biller to pay</p>
      </div>

      <div className="space-y-5">
        {/* Search Biller */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Search Biller
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Type to Search" 
              value={biller}
              onChange={(e) => setBiller(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-card-border bg-muted/20 outline-none focus:border-orange-500 transition-all" 
            />
          </div>
        </div>

        {/* Customer ID */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Customer ID
          </label>
          <input 
            type="text" 
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full p-4 rounded-2xl border border-card-border bg-muted/20 outline-none focus:border-orange-500 transition-all font-medium" 
          />
        </div>

        {/* Bill Amount */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Bill Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₦</span>
            <input 
              type="number" 
              placeholder="enter amount" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-4 rounded-2xl border border-card-border bg-muted/20 outline-none focus:border-orange-500 transition-all font-bold" 
            />
          </div>
        </div>
        
        {/* Optional Note */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            Add a note (Optional)
          </label>
          <textarea 
            placeholder="Hey, I'm sending you some funds!" 
            className="w-full p-4 rounded-2xl border border-card-border bg-muted/20 outline-none focus:border-orange-500 min-h-[100px] resize-none text-sm" 
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4">
        <button 
          type="submit"
          className="w-full h-14 bg-[#D31C31] text-white rounded-full font-bold hover:bg-[#b5182a] transition-all active:scale-[0.98] shadow-lg shadow-red-900/10"
        >
          Pay Bill
        </button>
      </div>

      {/* Security Info */}
      <div className="flex items-center gap-2 justify-center text-muted-foreground opacity-60">
        <Info size={14} />
        <span className="text-[10px]">Secure encrypted transaction</span>
      </div>
    </form>
  );
}