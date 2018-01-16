import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ZarzadzanieZwierzetamiComponent } from './pages/zarzadzanie-zwierzetami/zarzadzanie-zwierzetami.component';
import { PrzyciskComponent } from './components/przycisk/przycisk.component';
import { HeaderInfoComponent } from './components/header-info/header-info.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { WyszukiwarkaComponent } from './pages/wyszukiwarka/wyszukiwarka.component';
import {RouterModule} from '@angular/router';
import { NieZnalezionoComponent } from './pages/nie-znaleziono/nie-znaleziono.component';
import {appRoutes} from './routing';
import { PageComponent } from './components/page/page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListaZwierzatComponent } from './components/lista-zwierzat/lista-zwierzat.component';
import { EdycjaZwierzeciaComponent } from './pages/edycja-zwierzecia/edycja-zwierzecia.component';
import { ZdjecieComponent } from './components/zdjecie/zdjecie.component';
import { GatunekRasaComponent } from './components/gatunek-rasa/gatunek-rasa.component';
import { DodawanieZwierzeciaComponent } from './pages/dodawanie-zwierzecia/dodawanie-zwierzecia.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import {StateService} from './services/state.service';
import { WszystkieZwierzetaComponent } from './pages/wszystkie-zwierzeta/wszystkie-zwierzeta.component';
import { TouchMenuComponent } from './components/touch-menu/touch-menu.component';
import {ClickOutsideModule} from 'ng-click-outside';
import { LogowanieComponent } from './pages/logowanie/logowanie.component';
import {AuthGuard} from './services/auth-guard';
import {AuthService} from './services/auth.service';
import {AuthGuardLoginPage} from './services/auth-guard-login-page';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';
import {FileService} from './services/file.service';
import { FileInputComponent } from './components/file-input/file-input.component';
import {HttpClientModule} from '@angular/common/http';
import {ZwierzeService} from './services/zwierze.service';
import {RestService} from './services/rest.service';
import { KomunikatComponent } from './components/komunikat/komunikat.component';
import { WczytywanieComponent } from './components/wczytywanie/wczytywanie.component';
import { ZwierzeComponent } from './pages/zwierze/zwierze.component';
import {ListaAdopcjiComponent} from './pages/lista-adopcji/lista-adopcji.component';
import { FormularzAdopcjiComponent } from './pages/formularz-adopcji/formularz-adopcji.component';
import {AdopcjaService} from './services/adopcja.service';

@NgModule({
  declarations: [
    AppComponent,
    ZarzadzanieZwierzetamiComponent,
    PrzyciskComponent,
    HeaderInfoComponent,
    HeaderMenuComponent,
    WyszukiwarkaComponent,
    NieZnalezionoComponent,
    PageComponent,
    ListaZwierzatComponent,
    EdycjaZwierzeciaComponent,
    ZdjecieComponent,
    GatunekRasaComponent,
    DodawanieZwierzeciaComponent,
    TextInputComponent,
    WszystkieZwierzetaComponent,
    TouchMenuComponent,
    LogowanieComponent,
    FileInputComponent,
    KomunikatComponent,
    WczytywanieComponent,
    ZwierzeComponent,
    ListaAdopcjiComponent,
    FormularzAdopcjiComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ClickOutsideModule,
    AsyncLocalStorageModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [RestService, StateService, AuthService, AdopcjaService, AuthGuardLoginPage, AuthGuard, FileService, ZwierzeService],
  bootstrap: [AppComponent]
})
export class AppModule { }


