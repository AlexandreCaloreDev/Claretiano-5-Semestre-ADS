import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonText,
    IonTitle,
    IonToolbar,
  ],
})
export class LoginPage {
  usuario = '';
  senha = '';
  mensagem = '';

  constructor(private router: Router) {}

  entrar() {
    if (!this.usuario || !this.senha) {
      this.mensagem = 'Informe usuario e senha para acessar.';
      return;
    }
    this.mensagem = '';
    this.router.navigateByUrl('/menu');
  }
}
