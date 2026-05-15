import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ChamadosService } from '../services/chamados.service';

@Component({
  selector: 'app-cadastro-chamado',
  templateUrl: './cadastro-chamado.page.html',
  styleUrls: ['./cadastro-chamado.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar,
  ],
})
export class CadastroChamadoPage {
  solicitante = '';
  setor = '';
  titulo = '';
  descricao = '';
  prioridade = '';
  dataAbertura = new Date().toISOString().substring(0, 10);
  tecnico = '';
  status = 'Aberto';
  mensagem = '';
  prioridades = ['Baixa', 'Media', 'Alta', 'Urgente'];
  statusLista = ['Aberto', 'Em atendimento', 'Concluido', 'Cancelado'];

  constructor(
    public chamadosService: ChamadosService,
    private router: Router,
  ) {}

  salvar() {
    if (
      !this.solicitante ||
      !this.titulo ||
      !this.descricao ||
      !this.prioridade ||
      !this.tecnico
    ) {
      this.mensagem = 'Preencha os campos obrigatorios.';
      return;
    }
    this.chamadosService.adicionarChamado({
      solicitante: this.solicitante,
      setor: this.setor,
      titulo: this.titulo,
      descricao: this.descricao,
      prioridade: this.prioridade,
      dataAbertura: this.dataAbertura,
      tecnico: this.tecnico,
      status: this.status,
      observacao: '',
    });
    this.router.navigateByUrl('/lista-chamados');
  }
}
