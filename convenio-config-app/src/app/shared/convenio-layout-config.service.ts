import { Injectable } from '@angular/core';
import {RestApiService} from './rest-api.service';
import {LayoutConvenioModel} from './model/layout-convenio.model';
import {Observable} from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class ConvenioLayoutConfigService {

    constructor(private restApiService: RestApiService) {
    }
    salvar(layoutConvenioModel) {
        return this.restApiService.put<LayoutConvenioModel>('layout-convenio',
            layoutConvenioModel);
    }
    listar(): Observable<LayoutConvenioModel[]> {
        return this.restApiService.get<LayoutConvenioModel[]>('layout-convenio');
    }
}
