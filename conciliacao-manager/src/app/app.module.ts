import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CardContainerComponent } from './shared/card-container/card-container.component';
import { InputTypeaheadComponent } from './shared/input-typeahead/input-typeahead.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RestApiService} from './shared/rest-api.service';
import { CardTitleComponent } from './shared/card-title/card-title.component';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResumoQuitacaoComponent } from './resumo-quitacao/resumo-quitacao.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    CardContainerComponent,
    InputTypeaheadComponent,
    CardTitleComponent,
    ResumoQuitacaoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MenubarModule,
    MegaMenuModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    NgSelectModule
  ],
  providers: [RestApiService, { provide: LOCALE_ID, useValue: 'pt-BR' }    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
