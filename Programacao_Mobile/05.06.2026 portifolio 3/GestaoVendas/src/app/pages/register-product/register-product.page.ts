import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.page.html',
  styleUrls: ['./register-product.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class RegisterProductPage implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      priceFormatted: ['', [Validators.required]],
      stockQuantity: ['', [Validators.required]]
    });
  }

  onPriceInput(event: any) {
    let value = event.target.value;
    if (!value) return;
    
    value = value.toString().replace(/\D/g, '');
    if (value === '') {
      this.productForm.get('priceFormatted')?.setValue('', { emitEvent: false });
      return;
    }
    
    const numValue = parseInt(value, 10) / 100;
    const formatted = numValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    this.productForm.get('priceFormatted')?.setValue(formatted, { emitEvent: false });
  }

  onStockInput(event: any) {
    let value = event.target.value;
    if (!value) return;
    const cleanValue = value.toString().replace(/\D/g, '');
    this.productForm.get('stockQuantity')?.setValue(cleanValue, { emitEvent: false });
  }

  async onRegister() {
    if (this.productForm.valid) {
      const priceStr = this.productForm.value.priceFormatted;
      const priceClean = priceStr.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
      const priceNum = parseFloat(priceClean);

      if (isNaN(priceNum) || priceNum <= 0) {
        this.showToast('Preço inválido. Deve ser maior que zero.', 'danger');
        return;
      }

      const product = {
        id: crypto.randomUUID(),
        name: this.productForm.value.name,
        price: priceNum,
        stockQuantity: parseInt(this.productForm.value.stockQuantity, 10)
      };
      
      this.dataService.addProduct(product);
      this.showToast('Produto cadastrado com sucesso!', 'success');
      this.productForm.reset();
    } else {
      this.productForm.markAllAsTouched();
    }
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
