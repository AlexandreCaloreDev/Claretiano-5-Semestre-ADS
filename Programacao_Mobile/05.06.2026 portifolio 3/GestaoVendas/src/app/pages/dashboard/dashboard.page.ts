import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DashboardPage implements OnInit {
  totalSales = 0;
  totalReceived = 0;
  totalPending = 0;

  recentSales: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.sales$.subscribe(sales => {
      this.totalSales = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
      
      // Transform recent sales for display
      this.recentSales = sales.slice(-5).reverse().map(sale => {
        // We could look up client name here if we subscribe to clients$ as well
        return sale;
      });
    });

    this.dataService.payments$.subscribe(payments => {
      this.totalReceived = payments
        .filter(p => p.status === 'paid')
        .reduce((acc, p) => acc + p.amount, 0);
        
      this.totalPending = payments
        .filter(p => p.status === 'pending')
        .reduce((acc, p) => acc + p.amount, 0);
    });
  }
}
