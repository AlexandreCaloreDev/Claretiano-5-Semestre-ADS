export interface SaleItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Sale {
  id: string;
  clientId: string;
  items: SaleItem[];
  totalAmount: number;
  saleDate: string; // ISO string
}
