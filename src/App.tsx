import type { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext/Wallet.context';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './hooks/useTheme';
import Transfer from './pages/Transfer';
import Settings from './pages/Settings';

// Temporary placeholder components until we build the real ones
function App(): ReactElement {
  return (
    <ThemeProvider>
      <WalletProvider>
        <Router>
          <Layout>
            {/* REMOVED: The hardcoded bg-slate-50 div */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;