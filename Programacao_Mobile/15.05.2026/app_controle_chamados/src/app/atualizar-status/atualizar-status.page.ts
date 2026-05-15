import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ChamadosService } from '../services/chamados.service';

@Component({
  selector: 'app-atualizar-status',
  templateUrl: './atualizar-status.page.html',
  styleUrls: ['./atualizar-status.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class AtualizarStatusPage {
  id = Number(this.route.snapshot.paramMap.get('id'));
  chamado = this.chamadosService.buscarChamado(this.id);
  status = this.chamado?.status || 'Aberto';
  observacao = this.chamado?.observacao || '';
  statusLista = ['Aberto', 'Em atendimento', 'Concluido', 'Cancelado'];
  constructor(
    private route: ActivatedRoute,
    private chamadosService: ChamadosService,
    private router: Router,
  ) {}
  salvar() {
    this.chamadosService.atualizarStatus(this.id, this.status, this.observacao);
    this.router.navigateByUrl('/detalhes-chamado/' + this.id);
  }
}
