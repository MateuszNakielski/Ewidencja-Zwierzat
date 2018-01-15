import {Routes} from '@angular/router';
import {ZarzadzanieZwierzetamiComponent} from './pages/zarzadzanie-zwierzetami/zarzadzanie-zwierzetami.component';
import {WyszukiwarkaComponent} from './pages/wyszukiwarka/wyszukiwarka.component';
import {NieZnalezionoComponent} from './pages/nie-znaleziono/nie-znaleziono.component';
import {EdycjaZwierzeciaComponent} from './pages/edycja-zwierzecia/edycja-zwierzecia.component';
import {DodawanieZwierzeciaComponent} from './pages/dodawanie-zwierzecia/dodawanie-zwierzecia.component';
import {WszystkieZwierzetaComponent} from './pages/wszystkie-zwierzeta/wszystkie-zwierzeta.component';
import {LogowanieComponent} from './pages/logowanie/logowanie.component';
import {AuthGuard} from './services/auth-guard';
import {AuthGuardLoginPage} from './services/auth-guard-login-page';
import {ZwierzeComponent} from './pages/zwierze/zwierze.component';
import {ListaAdopcjiComponent} from './pages/lista-adopcji/lista-adopcji.component';
import {FormularzAdopcjiComponent} from './pages/formularz-adopcji/formularz-adopcji.component';

export const appRoutes: Routes = [
  {
    path: 'zarzadzanie-zwierzetami/edycja-adopcji/:id',
    component: FormularzAdopcjiComponent,
    canActivate: [AuthGuard],
    data: {
      path: '/ Edycja adopcji'
    }
  },
  {
    path: 'zarzadzanie-zwierzetami/dodawanie-adopcji/:id',
    component: FormularzAdopcjiComponent,
    canActivate: [AuthGuard],
    data: {
      path: '/ Dodawanie adopcji'
    }
  },
  {
    path: 'zarzadzanie-zwierzetami/lista-adopcji',
    component: ListaAdopcjiComponent,
    canActivate: [AuthGuard],
    data: {
      path: '/ Lista adopcji'
    }
  },
  {
    path: 'zarzadzanie-zwierzetami/wyszukiwarka',
    component: WyszukiwarkaComponent,
    canActivate: [AuthGuard],
    data: {
      path: '/ Wyszukiwarka'
    }
  },
  {
    path: 'zarzadzanie-zwierzetami/wszystkie-zwierzeta',
    component: WszystkieZwierzetaComponent,
    canActivate: [AuthGuard],
    data: {
      path: '/ Wszystkie zwierzęta'
    }
  },
  {
    path: 'zarzadzanie-zwierzetami/edycja/:id',
    component: EdycjaZwierzeciaComponent,
    canActivate: [AuthGuard],
    data: {
      path: '/ Edycja zwierzęcia'
    }
  },
  {
    path: 'zarzadzanie-zwierzetami/szczegoly-zwierzecia/:id',
    component: ZwierzeComponent,
    canActivate: [AuthGuard],
    data: {
      path: '/ Szczegóły zwierzęcia'
    }
  },
  {
    path: 'zarzadzanie-zwierzetami/dodaj-zwierze',
    component: DodawanieZwierzeciaComponent,
    canActivate: [AuthGuard],
    data: {
      path: '/ Dodaj zwierzę'
    }
  },
  { path: 'zarzadzanie-zwierzetami',
    component: ZarzadzanieZwierzetamiComponent,
    canActivate: [AuthGuard],
    data: {
      path: ''
    }
  },
  { path: '',
    component: LogowanieComponent,
    canActivate: [AuthGuardLoginPage],
    data: {
      path: 'Logowanie do systemu'
    },
    pathMatch: 'full'
  },
  { path: '**', component: NieZnalezionoComponent, data: { path: 'Error: 404'}}

];
