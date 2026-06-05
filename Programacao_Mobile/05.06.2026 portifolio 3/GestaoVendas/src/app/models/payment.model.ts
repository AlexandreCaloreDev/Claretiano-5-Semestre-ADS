export interface Payment {
  id: string;
  saleId: string;
  amount: number;
  dueDate: string; // ISO string
  status: 'pending' | 'paid';
  paymentDate?: string; // ISO string when paid
}
