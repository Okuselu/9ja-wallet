import { useEffect, useState, useCallback } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { AlertCircle, X } from 'lucide-react';

export default function GlobalErrorHandler() {
  const { error, clearError } = useWallet();
  // We only track "manualDismiss" to handle the slide-out animation
  const [isDismissing, setIsDismissing] = useState(false);

  // Derive visibility: if there's an error and we aren't currently dismissing it
  const isVisible = !!error && !isDismissing;

  const handleClose = useCallback(() => {
    setIsDismissing(true);
    // Wait for slide-out animation (300ms) before wiping the global error
    setTimeout(() => {
      clearError();
      setIsDismissing(false); // Reset for the next error
    }, 300);
  }, [clearError]);

  // Auto-hide logic stays in effect, but it no longer sets state synchronously
  useEffect(() => {
    if (error) {
      const timer = setTimeout(handleClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, handleClose]);

  if (!error && !isDismissing) return null;

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-md transition-all duration-300 ease-in-out ${
      isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0 pointer-events-none"
    }`}>
      <div className="bg-red-600 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between border border-white/10 animate-in shake duration-500">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-red-100">System Error</p>
            <p className="text-sm font-bold leading-tight">{error}</p>
          </div>
        </div>
        
        <button 
          onClick={handleClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}