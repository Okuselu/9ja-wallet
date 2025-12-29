import type { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext/Wallet.context';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from './hooks/useTheme';
import Transfer from './pages/Transfer';

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
            </Routes>
          </Layout>
        </Router>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
