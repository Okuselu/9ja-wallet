import { User, Bell, Shield, Moon, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useWallet } from '../hooks/useWallet';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { preferences, toggleHideBalance } = useWallet();

  const sections = [
    {
      title: "Account Profile",
      items: [
        { 
          icon: User, 
          label: "Personal Information", 
          desc: "Madeenat Cole, madenat@cole.com", 
          action: <ChevronRight size={18} className="text-muted-foreground/40" /> 
        },
        { 
          icon: Bell, 
          label: "Notifications", 
          desc: "Manage alerts and emails", 
          action: <ChevronRight size={18} className="text-muted-foreground/40" /> 
        },
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        { 
          icon: preferences.hideBalance ? EyeOff : Eye, 
          label: "Hide Balance", 
          desc: "Mask your balance on the dashboard", 
          action: (
            <button 
              onClick={() => toggleHideBalance()}   
              className={`w-10 h-5 rounded-full transition-all duration-300 relative ${
                preferences.hideBalance ? 'bg-orange-500' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 ${
                preferences.hideBalance ? 'left-6' : 'left-1'
              }`} />
            </button>
          ) 
        },
        { 
          icon: Shield, 
          label: "Two-Factor Auth", 
          desc: "Secure your account with 2FA", 
          action: (
            <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded tracking-tight">
              ENABLE
            </span>
          ) 
        },
      ]
    },
    {
      title: "Display",
      items: [
        { 
          icon: Moon, 
          label: "Dark Mode", 
          desc: "Switch between light and dark themes", 
          action: (
            <button 
              onClick={toggleTheme}
              className={`w-10 h-5 rounded-full transition-all duration-300 relative ${
                theme === 'dark' ? 'bg-orange-500' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 ${
                theme === 'dark' ? 'left-6' : 'left-1'
              }`} />
            </button>
          ) 
        },
      ]
    }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {sections.map((section, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-[0.2em] px-1">
            {section.title}
          </h3>
          <div className="bg-card border border-card-border rounded-3xl overflow-hidden shadow-sm">
            {section.items.map((item, i) => (
              <div 
                key={i} 
                className={`flex items-center justify-between p-5 transition-colors ${
                  i !== section.items.length - 1 ? 'border-b border-card-border' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-xl bg-muted text-muted-foreground">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {item.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Logout Option */}
      <div className="pt-4">
        <button className="w-full p-5 rounded-3xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm font-semibold hover:bg-red-500/10 transition-colors text-center">
          Sign Out of 9jaWallet
        </button>
      </div>
    </div>
  );
}