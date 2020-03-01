import { Injectable } from '@angular/core';
import {RestApiService} from './rest-api.service';
import {Observable} from 'rxjs/index';
import {ConciliacaoModel} from "./model/conciliacao.model";

@Injectable({
    providedIn: 'root'
})
export class ResumoQuitacaoService {

    constructor(private restApiService: RestApiService) {
    }
    listar(): Observable<ConciliacaoModel[]> {
        return this.restApiService.get<ConciliacaoModel[]>('resumo-quitacao');
    }
}
