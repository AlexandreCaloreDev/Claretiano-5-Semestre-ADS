import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Client } from '../../models/client.model';
import { Product } from '../../models/product.model';
import { SaleItem } from '../../models/sale.model';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.page.html',
  styleUrls: ['./sale.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SalePage implements OnInit {
  clients: Client[] = [];
  products: Product[] = [];
  
  selectedClientId: string = '';
  selectedProductId: string = '';
  quantityToAdd: number = 1;

  saleItems: SaleItem[] = [];
  paymentDueDate: string = '';

  constructor(
    private dataService: DataService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.dataService.clients$.subscribe(data => this.clients = data);
    this.dataService.products$.subscribe(data => this.products = data);
    
    // Set default due date to 30 days from now
    const date = new Date();
    date.setDate(date.getDate() + 30);
    this.paymentDueDate = date.toISOString();
  }

  get totalAmount(): number {
    return this.saleItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  addProductToSale() {
    if (!this.selectedProductId || this.quantityToAdd <= 0) return;

    const product = this.products.find(p => p.id === this.selectedProductId);
    if (!product) return;

    if (product.stockQuantity < this.quantityToAdd) {
      this.showToast('Quantidade em estoque insuficiente.', 'danger');
      return;
    }

    const existingItemIndex = this.saleItems.findIndex(i => i.productId === this.selectedProductId);
    
    if (existingItemIndex > -1) {
      const newQty = this.saleItems[existingItemIndex].quantity + this.quantityToAdd;
      if (newQty > product.stockQuantity) {
        this.showToast('Quantidade em estoque insuficiente.', 'danger');
        return;
      }
      this.saleItems[existingItemIndex].quantity = newQty;
      this.saleItems[existingItemIndex].totalPrice = newQty * product.price;
    } else {
      this.saleItems.push({
        productId: product.id,
        quantity: this.quantityToAdd,
        unitPrice: product.price,
        totalPrice: product.price * this.quantityToAdd
      });
    }

    this.selectedProductId = '';
    this.quantityToAdd = 1;
  }

  removeItem(index: number) {
    this.saleItems.splice(index, 1);
  }

  getProductName(id: string): string {
    const p = this.products.find(prod => prod.id === id);
    return p ? p.name : 'Desconhecido';
  }

  async finalizeSale() {
    if (!this.selectedClientId) {
      this.showToast('Selecione um cliente.', 'warning');
      return;
    }

    if (this.saleItems.length === 0) {
      this.showToast('Adicione ao menos um produto.', 'warning');
      return;
    }

    if (!this.paymentDueDate) {
      this.showToast('Selecione a data de vencimento.', 'warning');
      return;
    }

    const newSale = {
      id: crypto.randomUUID(),
      clientId: this.selectedClientId,
      items: [...this.saleItems],
      totalAmount: this.totalAmount,
      saleDate: new Date().toISOString()
    };

    this.dataService.addSale(newSale, this.paymentDueDate);
    
    this.showToast('Venda finalizada com sucesso!', 'success');
    
    // Reset form
    this.selectedClientId = '';
    this.saleItems = [];
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }
}
