import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonBackButton,
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
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
  imports: [
    CommonModule,
    IonBackButton,
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
export class ResumoPage {
  statusLista = ['Aberto', 'Em atendimento', 'Concluido', 'Cancelado'];
  prioridades = ['Baixa', 'Media', 'Alta', 'Urgente'];
  constructor(public chamadosService: ChamadosService) {}
  totalStatus(status: string) {
    return this.chamadosService
      .listarChamados()
      .filter((chamado) => chamado.status === status).length;
  }
  totalPrioridade(prioridade: string) {
    return this.chamadosService
      .listarChamados()
      .filter((chamado) => chamado.prioridade === prioridade).length;
  }
}
