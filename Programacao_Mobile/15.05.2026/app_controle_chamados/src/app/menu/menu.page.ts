import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar],
})
export class MenuPage {
  constructor(private router: Router) {}

  ir(rota: string) {
    this.router.navigateByUrl(rota);
  }

  sair() {
    this.router.navigateByUrl('/login');
  }
}
