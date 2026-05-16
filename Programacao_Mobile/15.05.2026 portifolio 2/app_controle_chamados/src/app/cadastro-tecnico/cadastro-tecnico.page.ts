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
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ChamadosService } from '../services/chamados.service';

@Component({
  selector: 'app-cadastro-tecnico',
  templateUrl: './cadastro-tecnico.page.html',
  styleUrls: ['./cadastro-tecnico.page.scss'],
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
    IonTitle,
    IonToolbar,
  ],
})
export class CadastroTecnicoPage {
  nome = '';
  especialidade = '';
  contato = '';
  situacao = 'Ativo';
  mensagem = '';
  especialidades = [
    'Hardware',
    'Software',
    'Rede',
    'Impressora',
    'Sistema interno',
    'Outros',
  ];
  situacoes = ['Ativo', 'Inativo'];
  constructor(
    private chamadosService: ChamadosService,
    private router: Router,
  ) {}
  salvar() {
    if (!this.nome || !this.especialidade || !this.contato) {
      this.mensagem = 'Preencha os campos obrigatorios.';
      return;
    }
    this.chamadosService.adicionarTecnico({
      nome: this.nome,
      especialidade: this.especialidade,
      contato: this.contato,
      situacao: this.situacao,
    });
    this.router.navigateByUrl('/lista-tecnicos');
  }
}
