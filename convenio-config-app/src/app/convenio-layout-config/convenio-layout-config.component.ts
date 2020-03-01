import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConvenioLayoutCampos} from './model/convenio-layout-campos';

@Component({
  selector: 'app-convenio-layout-config',
  templateUrl: './convenio-layout-config.component.html',
  styleUrls: ['./convenio-layout-config.component.scss']
})
export class ConvenioLayoutConfigComponent implements OnInit {

  layoutConfigForm : FormGroup;
  listConvenio;
  formatosIntegracao = [
      'TXT',
      'HTML',
      'XML',
      'CSV'
  ];
  listCampos = ConvenioLayoutCampos;
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
      this.layoutConfigForm = this.formBuilder.group({
          convenio : [],
          formatoIntegracao : []
      });
  }


  submit(){

  }

  isIntegracaoTxt(){
      return this.layoutConfigForm.get('formatoIntegracao').value == 'TXT';
  }
  isIntegracaoHtml(){
        return this.layoutConfigForm.get('formatoIntegracao').value == 'HTML';
  }
  isIntegracaoXml(){
        return this.layoutConfigForm.get('formatoIntegracao').value == 'XML';
  }
  isIntegracaoCSV(){
        return this.layoutConfigForm.get('formatoIntegracao').value == 'CSV';
  }
  numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode <= 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}
