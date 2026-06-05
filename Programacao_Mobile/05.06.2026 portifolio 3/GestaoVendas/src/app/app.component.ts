import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, RouterLinkActive],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'pie-chart' },
    { title: 'Novo Produto', url: '/register-product', icon: 'cube' },
    { title: 'Novo Cliente', url: '/register-client', icon: 'people' },
    { title: 'PDV (Venda)', url: '/sale', icon: 'cart' },
    { title: 'Contas a Receber', url: '/receivables', icon: 'wallet' },
  ];

  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}
