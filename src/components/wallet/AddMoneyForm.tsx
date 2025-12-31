import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface DetailRowProps {
  label: string;
  value: string;
  onCopy?: () => void;
  isCopied?: boolean;
}

export default function AddMoneyForm({ onClose }: { onClose: () => void }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right duration-300">
      <div className="bg-muted/20 p-4 rounded-lg border border-card-border">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Notice</p>
        <p className="text-xs text-foreground">
          Transfer the exact amount to the account below. Your wallet will be credited automatically.
        </p>
      </div>

      <div className="space-y-1">
        <DetailRow label="Bank Name" value="Sterling Bank" />
        <DetailRow label="Account Name" value="Kate Durojaiye" />
        <DetailRow
          label="Account Number"
          value="8817096087"
          isCopied={copiedField === "Account Number"}
          onCopy={() => handleCopy("8817096087", "Account Number")}
        />
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={onClose}
          className="w-full h-12 bg-[#D31C31] text-white rounded-md font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-red-900/10"
        >
          I have sent the money
        </button>
        <button
          onClick={onClose}
          className="w-full h-12 bg-transparent border border-card-border rounded-md font-bold text-xs text-muted-foreground uppercase tracking-widest hover:bg-muted transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function DetailRow({ label, value, onCopy, isCopied }: DetailRowProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-bold text-foreground tracking-wide">{value}</span>
        {onCopy && (
          <button
            onClick={onCopy}
            className="text-orange-500 hover:scale-110 transition-all"
          >
            {isCopied ? (
              <Check size={18} className="text-emerald-500" />
            ) : (
              <Copy size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
