import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-detalhes-chamado',
  templateUrl: './detalhes-chamado.page.html',
  styleUrls: ['./detalhes-chamado.page.scss'],
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
export class DetalhesChamadoPage {
  id = Number(this.route.snapshot.paramMap.get('id'));
  chamado = this.chamadosService.buscarChamado(this.id);
  constructor(
    private route: ActivatedRoute,
    public chamadosService: ChamadosService,
    private router: Router,
  ) {}
  atualizar() {
    this.router.navigateByUrl('/atualizar-status/' + this.id);
  }
}
