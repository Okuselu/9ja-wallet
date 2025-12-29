import type { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext/Wallet.context';

// Temporary placeholder components until we build the real ones
const Dashboard = () => <div className="p-8"><h1>Dashboard Coming Soon</h1></div>;
const Transfer = () => <div className="p-8"><h1>Transfer Page Coming Soon</h1></div>;

function App(): ReactElement {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          {/* Navbar will go here */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transfer" element={<Transfer />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
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
