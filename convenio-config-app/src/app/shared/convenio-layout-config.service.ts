import { Injectable } from '@angular/core';
import {map} from 'rxjs/internal/operators';
import {RestApiService} from './rest-api.service';
import {LayoutConvenioModel} from './model/layout-convenio.model';
import {Observable} from "rxjs/index";

@Injectable({
    providedIn: 'root'
})
export class ConvenioLayoutConfigService {

    constructor(private restApiService: RestApiService) {
    }
    salvar(layoutConvenioModel) {
        return this.restApiService.put<LayoutConvenioModel>('convenio-config-layout',
            layoutConvenioModel);
    }
    listar(): Observable<LayoutConvenioModel[]> {
        return this.restApiService.get<LayoutConvenioModel[]>('convenio-config-layout');
    }
}
