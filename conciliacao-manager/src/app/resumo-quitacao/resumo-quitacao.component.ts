import { Component, OnInit } from '@angular/core';
import {ConciliacaoModel} from '../shared/model/conciliacao.model';
import {ResumoQuitacaoService} from "../shared/resumo-quitacao.service";

@Component({
  selector: 'app-resumo-quitacao',
  templateUrl: './resumo-quitacao.component.html',
  styleUrls: ['./resumo-quitacao.component.scss']
})
export class ResumoQuitacaoComponent implements OnInit {

  listaResumoQuitacao: ConciliacaoModel[];
  constructor(private resumoQuitacaoService: ResumoQuitacaoService) { }

  ngOnInit() {
    this.resumoQuitacaoService.listar().subscribe(value =>{
      this.listaResumoQuitacao = value;
    });
  }

}
