export interface Transaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string; 
  date: string;
  category?: string;
}