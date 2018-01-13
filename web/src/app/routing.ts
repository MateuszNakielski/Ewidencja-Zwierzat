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

export const appRoutes: Routes = [
  {
    path: 'zarzadzanie-zwierzetami/wyszukiwarka',
    component: WyszukiwarkaComponent,
    canActivate: [AuthGuard],
    data: {
      path: 'Strona główna / Zarządzanie zwierzętami / Wyszukiwarka'
    }
  },
  {
    path: 'zarzadzanie-zwierzetami/wszystkie-zwierzeta',
    component: WszystkieZwierzetaComponent,
    canActivate: [AuthGuard],
    data: {
      path: 'Strona główna / Zarządzanie zwierzętami / Wszystkie zwierzęta'
    }
  },
  {
    path: 'zarzadzanie-zwierzetami/edycja/:id',
    component: EdycjaZwierzeciaComponent,
    canActivate: [AuthGuard],
    data: {
      path: 'Strona główna / Zarządzanie zwierzętami / Edycja'
    }
  },
  {
    path: 'zarzadzanie-zwierzetami/dodaj-zwierze',
    component: DodawanieZwierzeciaComponent,
    canActivate: [AuthGuard],
    data: {
      path: 'Strona główna / Zarządzanie zwierzętami / Dodaj zwierzę'
    }
  },
  { path: 'zarzadzanie-zwierzetami',
    component: ZarzadzanieZwierzetamiComponent,
    canActivate: [AuthGuard],
    data: {
      path: 'Strona główna / Zarządzanie zwierzętami'
    }
  },
  { path: '',
    component: LogowanieComponent,
    canActivate: [AuthGuardLoginPage],
    data: {
      path: 'Strona główna'
    },
    pathMatch: 'full'
  },
  { path: '**', component: NieZnalezionoComponent, data: { path: 'Error: 404'}}

];
