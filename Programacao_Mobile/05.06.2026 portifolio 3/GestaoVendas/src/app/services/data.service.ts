import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Client } from '../models/client.model';
import { Sale } from '../models/sale.model';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  private clientsSubject = new BehaviorSubject<Client[]>([]);
  public clients$ = this.clientsSubject.asObservable();

  private salesSubject = new BehaviorSubject<Sale[]>([]);
  public sales$ = this.salesSubject.asObservable();

  private paymentsSubject = new BehaviorSubject<Payment[]>([]);
  public payments$ = this.paymentsSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.productsSubject.next(this.getFromStorage('products'));
    this.clientsSubject.next(this.getFromStorage('clients'));
    this.salesSubject.next(this.getFromStorage('sales'));
    this.paymentsSubject.next(this.getFromStorage('payments'));
  }

  private getFromStorage(key: string): any[] {
    const data = localStorage.getItem(`gestao_vendas_${key}`);
    return data ? JSON.parse(data) : [];
  }

  private saveToStorage(key: string, data: any[]) {
    localStorage.setItem(`gestao_vendas_${key}`, JSON.stringify(data));
  }

  // --- Products ---
  addProduct(product: Product) {
    const current = this.productsSubject.value;
    const updated = [...current, product];
    this.saveToStorage('products', updated);
    this.productsSubject.next(updated);
  }

  updateProductStock(productId: string, quantityToReduce: number) {
    const current = this.productsSubject.value;
    const updated = current.map(p => {
      if (p.id === productId) {
        return { ...p, stockQuantity: p.stockQuantity - quantityToReduce };
      }
      return p;
    });
    this.saveToStorage('products', updated);
    this.productsSubject.next(updated);
  }

  // --- Clients ---
  addClient(client: Client) {
    const current = this.clientsSubject.value;
    const updated = [...current, client];
    this.saveToStorage('clients', updated);
    this.clientsSubject.next(updated);
  }

  // --- Sales & Payments ---
  addSale(sale: Sale, paymentDueDate: string) {
    // 1. Add Sale
    const currentSales = this.salesSubject.value;
    const updatedSales = [...currentSales, sale];
    this.saveToStorage('sales', updatedSales);
    this.salesSubject.next(updatedSales);

    // 2. Reduce Stock
    sale.items.forEach(item => {
      this.updateProductStock(item.productId, item.quantity);
    });

    // 3. Create Payment (Contas a Receber)
    const payment: Payment = {
      id: crypto.randomUUID(),
      saleId: sale.id,
      amount: sale.totalAmount,
      dueDate: paymentDueDate,
      status: 'pending'
    };
    const currentPayments = this.paymentsSubject.value;
    const updatedPayments = [...currentPayments, payment];
    this.saveToStorage('payments', updatedPayments);
    this.paymentsSubject.next(updatedPayments);
  }

  // --- Payments (Receber) ---
  payPayment(paymentId: string) {
    const current = this.paymentsSubject.value;
    const updated = current.map(p => {
      if (p.id === paymentId) {
        return { ...p, status: 'paid', paymentDate: new Date().toISOString() } as Payment;
      }
      return p;
    });
    this.saveToStorage('payments', updated);
    this.paymentsSubject.next(updated);
  }
}
