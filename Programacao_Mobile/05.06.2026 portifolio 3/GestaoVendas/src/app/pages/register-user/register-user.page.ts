import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class RegisterUserPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const user = {
        id: crypto.randomUUID(),
        ...this.registerForm.value
      };
      
      const success = this.authService.registerUser(user);
      
      if (success) {
        const toast = await this.toastCtrl.create({
          message: 'Usuário cadastrado com sucesso!',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.navCtrl.navigateBack('/login');
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Nome de usuário já existe!',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
