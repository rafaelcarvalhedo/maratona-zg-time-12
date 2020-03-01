import {Component, OnInit} from '@angular/core';
import {ConvenioLayoutConfigService} from "../shared/convenio-layout-config.service";
import {LayoutConvenioModel} from "../shared/model/layout-convenio.model";

@Component({
    selector: 'app-convenio-layout-list',
    templateUrl: './convenio-layout-list.component.html',
    styleUrls: ['./convenio-layout-list.scss']
})
export class ConfigLayoutListComponent implements OnInit {

    listConvenioConfig: LayoutConvenioModel[];

    constructor(private convenioLayoutConfigService: ConvenioLayoutConfigService) {
    }

    ngOnInit() {
        this.convenioLayoutConfigService
            .listar()
            .subscribe(value => {
                this.listConvenioConfig = value;
            });
    }


}
