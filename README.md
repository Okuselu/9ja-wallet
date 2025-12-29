9jaWallet 
A high-performance, modern FinTech digital wallet dashboard built with React, TypeScript, and Tailwind CSS v4. This project implements advanced state management patterns to simulate a real-world financial experience.

🚀 Key Features
Optimistic UI Transfers: Immediate UI updates on fund transfers with automatic rollback mechanisms on failure.

Real-time Balance Management: Multi-account support (Main vs. Savings) using centralized state.

Advanced Transaction Filtering: High-performance client-side searching and category filtering.

Modern Aesthetic: Built with a shadcn/ui and Tailark inspired design language.

Strict Type Safety: Comprehensive TypeScript interfaces for financial data structures.

🛠️ Tech Stack
Framework: React 18 (Vite)

State Management: useReducer + Context API (Decoupled logic for testability)

Styling: Tailwind CSS v4 + lucide-react for iconography

Routing: React Router 7

Package Manager: pnpm

🏗️ Architecture & Patterns
1. The Reducer Pattern
We utilize a decoupled WalletReducer to handle state transitions. This ensures that business logic for financial calculations remains pure and easily testable outside of the React component lifecycle.

2. Optimistic Updates
To ensure a "zero-latency" feel, the app predicts the success of transactions. If the simulated API call fails, the state is automatically reverted to the last known "good" state using a TRANSFER_REVERT action.

3. Folder Structure
Plaintext

src/
├── @types/         # Strict naming: *.interface.ts
├── components/     # UI Atoms & Layout wrappers
├── context/        # State Providers & Reducers
├── data/           # Mock JSON data seeding
├── hooks/          # Custom hooks (e.g., useWallet)
└── utils/          # Formatting and Tailwind merging (cn utility)
🚦 Getting Started
Prerequisites
Node.js 18+

pnpm 10+

Installation
Clone the repository

Bash

git clone https://github.com/your-username/9ja-wallet.git
cd 9ja-wallet
Install dependencies

Bash

pnpm install
Run development server

Bash

pnpm dev
📝 Developer Notes
This project follows Conventional Commits and a strict branching strategy (main -> development -> feature/). All UI components are built to be modular and responsive.



<!-- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
``` -->
