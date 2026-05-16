import { Injectable } from '@angular/core';

export interface Chamado {
  id: number;
  solicitante: string;
  setor: string;
  titulo: string;
  descricao: string;
  prioridade: string;
  dataAbertura: string;
  tecnico: string;
  status: string;
  observacao: string;
}

export interface Tecnico {
  id: number;
  nome: string;
  especialidade: string;
  contato: string;
  situacao: string;
}

@Injectable({ providedIn: 'root' })
export class ChamadosService {
  chamados: Chamado[] = [];
  tecnicos: Tecnico[] = [];
  private proximoChamado = 1;
  private proximoTecnico = 1;

  adicionarChamado(chamado: Omit<Chamado, 'id'>) {
    this.chamados.push({ id: this.proximoChamado++, ...chamado });
  }

  listarChamados() {
    return this.chamados;
  }

  buscarChamado(id: number) {
    return this.chamados.find((chamado) => chamado.id === id);
  }

  excluirChamado(id: number) {
    this.chamados = this.chamados.filter((chamado) => chamado.id !== id);
  }

  atualizarStatus(id: number, status: string, observacao: string) {
    const chamado = this.buscarChamado(id);
    if (chamado) {
      chamado.status = status;
      chamado.observacao = observacao;
    }
  }

  adicionarTecnico(tecnico: Omit<Tecnico, 'id'>) {
    this.tecnicos.push({ id: this.proximoTecnico++, ...tecnico });
  }

  listarTecnicos() {
    return this.tecnicos;
  }

  excluirTecnico(id: number) {
    this.tecnicos = this.tecnicos.filter((tecnico) => tecnico.id !== id);
  }
}
