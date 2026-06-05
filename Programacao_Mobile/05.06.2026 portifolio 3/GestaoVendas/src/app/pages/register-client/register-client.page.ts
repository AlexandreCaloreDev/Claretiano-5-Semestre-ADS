import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.page.html',
  styleUrls: ['./register-client.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class RegisterClientPage implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      document: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    });
  }

  onDocumentInput(event: any) {
    let value = event.target.value;
    if (!value) return;
    value = value.toString().replace(/\D/g, '');
    if (value.length > 14) value = value.substring(0, 14);
    
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    this.clientForm.get('document')?.setValue(value, { emitEvent: false });
  }

  onPhoneInput(event: any) {
    let value = event.target.value;
    if (!value) return;
    value = value.toString().replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      value = value.replace(/^(\d*)/, '($1');
    }
    this.clientForm.get('phone')?.setValue(value, { emitEvent: false });
  }

  async onRegister() {
    if (this.clientForm.valid) {
      const client = {
        id: crypto.randomUUID(),
        ...this.clientForm.value
      };
      
      this.dataService.addClient(client);
      
      const toast = await this.toastCtrl.create({
        message: 'Cliente cadastrado com sucesso!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
      
      this.clientForm.reset();
    } else {
      this.clientForm.markAllAsTouched();
    }
  }
}
