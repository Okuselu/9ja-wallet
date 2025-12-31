import type { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext/Wallet.context';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './hooks/useTheme';
import Settings from './pages/Settings';
import Transactions from './pages/Transaction';
import GlobalErrorHandler from './components/shared/globalErrorHandler';

function App(): ReactElement {
  return (
    <ThemeProvider>
      <WalletProvider>
        <Router>
          <Layout>
            <GlobalErrorHandler />             
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
          </Layout>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;