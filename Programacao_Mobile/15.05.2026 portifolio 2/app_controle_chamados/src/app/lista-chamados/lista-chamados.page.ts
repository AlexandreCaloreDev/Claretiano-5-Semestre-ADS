import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ChamadosService } from '../services/chamados.service';

@Component({
  selector: 'app-lista-chamados',
  templateUrl: './lista-chamados.page.html',
  styleUrls: ['./lista-chamados.page.scss'],
  imports: [
    CommonModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
})
export class ListaChamadosPage {
  constructor(
    public chamadosService: ChamadosService,
    private router: Router,
  ) {}
  abrir(id: number) {
    this.router.navigateByUrl('/detalhes-chamado/' + id);
  }
  excluir(id: number) {
    this.chamadosService.excluirChamado(id);
  }
}
