import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Plus,
  Send,
  Landmark,
  Receipt,
  ChevronDown,
} from "lucide-react";

import { useWallet } from "../hooks/useWallet";
import { cn } from "../utils/cn";

import SideModal from "../components/Modal/SideModal";
import TransferForm from "../components/wallet/TransferForm";
import AddMoneyForm from "../components/wallet/AddMoneyForm";
import PayBillForm from "../components/wallet/PayBillForm";
import TransactionList from "../components/wallet/TransactionList"; // Import your list component
import ExternalTransferForm from "../components/wallet/ExternalTransferForm";

/* -------------------------------------------------------------------------- */
/* TYPES                                    */
/* -------------------------------------------------------------------------- */

type AccountTab = "main-001" | "save-002";
type ModalType = "add" | "send" | "save" | "bills" | null;

/* -------------------------------------------------------------------------- */
/* DASHBOARD                                   */
/* -------------------------------------------------------------------------- */

export default function Dashboard() {
  const { accounts, preferences, toggleHideBalance } = useWallet();
  const [activeTab, setActiveTab] = useState<AccountTab>("main-001");
  const [modalType, setModalType] = useState<ModalType>(null);

  const activeAccount = accounts.find((a) => a.id === activeTab);
  const isMain = activeTab === "main-001";

  /* ------------------------------------------------------------------------ */
  /* RENDER                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10 animate-in fade-in duration-700">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-foreground">Welcome, Kate</h1>
      </header>

      {/* Balance + Promo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-2 bg-card border border-card-border rounded-sm p-8 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Wallet Balance
              </p>

              <div className="flex items-center gap-3">
                <h2 className="text-5xl font-black tracking-tighter text-foreground">
                  {preferences.hideBalance
                    ? "••••••"
                    : `₦${activeAccount?.balance.toLocaleString()}`}
                </h2>

                <button
                  onClick={toggleHideBalance}
                  className="p-1 text-muted-foreground hover:text-[#FF4D00] transition-colors"
                >
                  {preferences.hideBalance ? (
                    <EyeOff size={28} />
                  ) : (
                    <Eye size={28} />
                  )}
                </button>
              </div>
            </div>

            {/* Account Switcher */}
            <button
              onClick={() => setActiveTab(isMain ? "save-002" : "main-001")}
              className="flex items-center gap-2 bg-muted/30 px-4 py-2 rounded-full border border-card-border text-sm font-bold text-foreground hover:bg-muted transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px]">
                🇳🇬
              </span>
              {isMain ? "Main Account" : "Savings Account"}
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Primary Action */}
          <div className="flex gap-4 mt-8">
            {isMain ? (
              <button
                onClick={() => setModalType("send")}
                className="flex-1 h-14 bg-[#D31C31] hover:bg-[#b5182a] text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Send size={20} /> Send Money
              </button>
            ) : (
              <button
                onClick={() => setModalType("add")}
                className="flex-1 h-14 bg-[#D31C31] hover:bg-[#b5182a] text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Plus size={20} /> Add Money
              </button>
            )}
          </div>
        </div>

        {/* Promo Card */}
        <div className="bg-gradient-to-br from-[#FF4D00] to-[#FF8C00] rounded-sm p-8 text-white flex flex-col justify-between shadow-lg shadow-orange-500/20">
          <p className="font-bold text-xl leading-tight">
            Invite friends and <br /> earn ₦5,000.00
          </p>

          <div className="mt-4 bg-white/10 p-4 rounded-2xl flex justify-between items-center border border-white/20 backdrop-blur-md">
            <span className="text-xs">
              Referral Code
              <br />
              <b className="text-lg font-black tracking-wider">045rH5</b>
            </span>

            <button className="bg-white text-[#FF4D00] px-4 py-2 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors">
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section>
        <h3 className="text-lg font-bold mb-6 text-foreground">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ActionCard
            icon={<Plus />}
            label="Add Money"
            color="bg-emerald-500/10 text-emerald-500"
            onClick={() => setModalType("add")}
          />
          <ActionCard
            icon={<Send />}
            label="Send Money"
            color="bg-blue-500/10 text-blue-500"
            onClick={() => setModalType("send")}
          />
          <ActionCard
            icon={<Landmark />}
            label="Save Money"
            color="bg-orange-500/10 text-orange-500"
            onClick={() => setModalType("save")}
          />
          <ActionCard
            icon={<Receipt />}
            label="Pay Bills"
            color="bg-purple-500/10 text-purple-500"
            onClick={() => setModalType("bills")}
          />
        </div>
      </section>

      {/* Recent Transactions Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-end px-2">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Recent Transactions
            </h3>
            <p className="text-sm text-muted-foreground">
              Manage and filter your latest activities
            </p>
          </div>
          <Link
            to="/transactions"
            className="text-sm font-bold text-[#D31C31] hover:underline"
          >
            Full History
          </Link>
        </div>

        {/* Now visible and functional on Dashboard */}
        <TransactionList initialLimit={5} />
      </section>

      {/* Modal */}
      <SideModal
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
        title={getModalTitle(modalType)}
      >
        {renderModalContent(modalType, setModalType)}
      </SideModal>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SUB-COMPONENTS                                */
/* -------------------------------------------------------------------------- */

interface ActionCardProps {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}

function ActionCard({ icon, label, color, onClick }: ActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-4 p-8 rounded-sm bg-card border border-card-border hover:border-[#FF4D00]/30 hover:shadow-lg hover:shadow-orange-500/5 transition-all group"
    >
      <div
        className={cn(
          "p-4 rounded-2xl transition-transform group-hover:scale-110",
          color
        )}
      >
        {icon}
      </div>
      <span className="font-bold text-sm text-foreground">{label}</span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* MODAL HELPERS                                 */
/* -------------------------------------------------------------------------- */

function renderModalContent(type: ModalType, setModalType: (v: ModalType) => void) {
  switch (type) {
    case "add":
      return <AddMoneyForm onClose={() => setModalType(null)} />;
    case "send":
      // External Bank Transfer
      return <ExternalTransferForm onSuccess={() => setModalType(null)} />;
    case "save":
      // Internal Transfer to Savings
      return (
        <TransferForm 
          onSuccess={() => setModalType(null)} 
          fixedDestination="save-002" 
          defaultSource="main-001" 
        />
      );
    case "bills":
      return <PayBillForm />;
    default:
      return null;
  }
}

function getModalTitle(type: ModalType) {
  switch (type) {
    case "add": return "Add Money";
    case "send": return "Send to Bank Account";
    case "save": return "Save Money"; 
    case "bills": return "Pay a Bill";
    default: return "";
  }
}