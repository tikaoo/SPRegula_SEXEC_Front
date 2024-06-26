import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { CadastrarProcessosComponent } from './pages/cadastrar-processos/cadastrar-processos.component';
import { EditarProcessosComponent } from './pages/editar-processos/editar-processos.component';
import { ListarProcessosComponent } from './pages/listar-processos/listar-processos.component';
import { NavibarComponent } from './pages/navibar/navibar.component';
import { confirmExitGuard } from '../guard/confirm-exit.guard';
import { RegistrarComponent } from './pages/registrar/registrar/registrar.component';
import { EditUsersComponent } from './pages/editar-usuarios/edit-users/edit-users.component';
import { ListUsersComponent } from './pages/listar-users/list-users/list-users.component';
import { isNumberGuard } from '../guard/is-number.guard';

const routes: Routes = [
  {
    path: 'spregula/cadastrar-processos',
    component: CadastrarProcessosComponent,
    canDeactivate: [
      confirmExitGuard
    ]
  },
  {
    path: 'spregula/edit/:SEI',
    component: EditarProcessosComponent,
    canDeactivate: [
      confirmExitGuard
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home/login'
  },

  {
    path: 'login',
    component: NavibarComponent
  },
  {
    path: 'processos',
    component: ListarProcessosComponent
  },
  {
    path: 'registrar',
    component: RegistrarComponent
  },
  {
    path: 'users',
    component: ListUsersComponent,
  },
  {
    path:'user/:id',
    component:EditUsersComponent,
    canActivate:[
      isNumberGuard
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProcessosRoutingModule { }
