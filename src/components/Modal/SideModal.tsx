import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function SideModal({ isOpen, onClose, title, children }: SideModalProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={cn(
        "fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl transition-transform duration-500 ease-out transform",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}