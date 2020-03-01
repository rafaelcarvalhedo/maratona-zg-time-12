import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConvenioLayoutCampos} from './model/convenio-layout-campos';
import {LayoutConvenioModel} from '../shared/model/layout-convenio.model';
import {ConvenioLayoutConfigService} from "../shared/convenio-layout-config.service";
import {valueReferenceToExpression} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";

@Component({
    selector: 'app-convenio-layout-config',
    templateUrl: './convenio-layout-config.component.html',
    styleUrls: ['./convenio-layout-config.component.scss']
})
export class ConvenioLayoutConfigComponent implements OnInit {

    layoutConfigForm: FormGroup;
    listConvenio;
    formatosIntegracao = [
        'TXT',
        'HTML',
        'XML',
        'CSV'
    ];
    delimitador;
    convenioSelecionado;
    listCampos: LayoutConvenioModel[] = ConvenioLayoutCampos;

    constructor(private formBuilder: FormBuilder, private  convenioLayoutConfigService: ConvenioLayoutConfigService) {

    }

    ngOnInit() {
        this.layoutConfigForm = this.formBuilder.group({
            convenio: [],
            formatoIntegracao: []
        });
        this.listConvenio = [
            {
                name: 'Glosa Max',
                id: 655360
            },
            {
                name: 'Paga tudo',
                id: 1179648
            },
            {
                name: 'Glosa Min',
                id: 2
            }
        ];
    }


    submit() {

    }

    isIntegracaoTxt() {
        return this.layoutConfigForm.get('formatoIntegracao').value == 'TXT';
    }

    isIntegracaoHtml() {
        return this.layoutConfigForm.get('formatoIntegracao').value == 'HTML';
    }

    isIntegracaoXml() {
        return this.layoutConfigForm.get('formatoIntegracao').value == 'XML';
    }

    isIntegracaoCSV() {
        return this.layoutConfigForm.get('formatoIntegracao').value == 'CSV';
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode <= 48 || charCode > 57)) {
            return false;
        }
        return true;
    }

    gravar() {
        this.convenioLayoutConfigService.salvar(this.formatToJSON())
            .subscribe(value => {
                alert('Gravado com sucesso!');
            }, error => {
                alert('Erro ao gravar');
            });
    }

    formatToJSON(): LayoutConvenioModel[] {
        return this.listCampos.map(value => {
            const convenioConfig: LayoutConvenioModel = {};
            convenioConfig.chave = value.chave;
            convenioConfig.id_convenio = this.layoutConfigForm.get('convenio').value;
            convenioConfig.extensao = this.layoutConfigForm.get('formatoIntegracao').value;
            if (this.isIntegracaoTxt()) {
                convenioConfig.posicao_inicial = value.posicao_inicial;
                convenioConfig.posicao_final = value.posicao_final;
            }
            if (this.isIntegracaoHtml() || this.isIntegracaoXml()) {
                convenioConfig.tag_seletor = value.tag_seletor;
            }
            if (this.isIntegracaoCSV()) {
                convenioConfig.indice = value.indice;
                convenioConfig.delimitador = value.indice;
            }
            return convenioConfig;
        });
    }
}
