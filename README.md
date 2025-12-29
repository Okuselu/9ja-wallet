9ja-Wallet Mini Dashboard 🇳🇬
A high-fidelity, responsive fintech dashboard built with React, TypeScript, and Tailwind CSS. This project demonstrates a secure, "privacy-first" approach to digital banking interfaces.

🚀 Core Functionalities
1. Unified State Management
Utilizes the React Context API with a useReducer pattern to create a centralized "Source of Truth" for account balances and transaction history.

Persistence: Integrates with localStorage to ensure user preferences (Theme, Privacy Mode) and account states persist across sessions.

2. Smart Transfers (Optimistic UI)
Supports bidirectional funds movement between "Main Wallet" and "Savings Goal."

Validation: Implements strict financial logic, including:

Insufficient funds check.

Positive decimal validation.

Maximum 2 decimal place precision (to prevent floating-point errors).

Instant Feedback: Employs an optimistic update strategy where the UI reflects the new balance immediately while simulating a 1.2s network request.

3. Privacy & Security Hygiene
Privacy Mode: A global toggle that masks balances and transaction amounts (e.g., ₦450,000.00 → ••••••) across all components.

Safe Logging: Ensures no sensitive transaction objects are leaked in production console logs.

Sanitized Errors: User-facing error messages are handled gracefully without exposing internal stack traces.

4. Dynamic Transaction History
Real-time search by merchant name.

Categorical filtering (Food, Utilities, Salary, etc.) using optimized useMemo hooks for zero-latency UI updates.

🛠 Tech Stack
Framework: React 18 (Vite-powered)

Language: TypeScript (Strict Mode)

Styling: Tailwind CSS

Icons: Lucide React

Animations: Tailwind Animate

📐 Architectural Decisions
Why Context API over Redux?
For a "Mini Wallet" scope, Redux would introduce unnecessary boilerplate. Context API provides excellent performance for this level of state nesting while keeping the bundle size small and the codebase maintainable.

Why useReducer?
Financial transactions involve complex state transitions (decrementing one account while incrementing another). useReducer ensures these transitions are atomic, preventing "ghost money" bugs where one account updates but the other fails.

Component Design
I followed the Atomic Design principle, separating "Dumb" UI components (BalanceCards, TransactionRows) from "Smart" Container components (TransferForm, Dashboard).

🏃‍♂️ Getting Started
Clone the repo:

Bash

git clone https://github.com/Okuselu/9ja-wallet.git
Install dependencies:

Bash

pnpm install
Run Development Server:

Bash

pnpm dev
Build for Production:

Bash

pnpm build
💡 Future Roadmap
Graphs: Integration of Chart.js to visualize monthly spending trends.

Zod Validation: Move from manual form validation to schema-based validation.

Unit Testing: Implement Vitest for the reducer logic to ensure 100% accuracy in financial calculations.