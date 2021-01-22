import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule)},
  {path: 'election', loadChildren: () => import('./election/election.module').then(d => d.ElectionModule)},
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: '***', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
