import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Payment } from '../../models/payment.model';

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.page.html',
  styleUrls: ['./receivables.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ReceivablesPage implements OnInit {
  payments: Payment[] = [];

  constructor(
    private dataService: DataService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.dataService.payments$.subscribe(data => {
      // Sort by status ('pending' first) then date
      this.payments = data.sort((a, b) => {
        if (a.status === b.status) {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
        return a.status === 'pending' ? -1 : 1;
      });
    });
  }

  async payPayment(payment: Payment) {
    if (payment.status === 'paid') return;

    const alert = await this.alertCtrl.create({
      header: 'Confirmar Pagamento',
      message: `Deseja baixar esta conta no valor de R$ ${payment.amount.toFixed(2)}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.dataService.payPayment(payment.id);
            this.showToast('Pagamento baixado com sucesso!');
          }
        }
      ]
    });

    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
