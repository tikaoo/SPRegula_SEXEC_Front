import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { CadastrarProcessosComponent } from './pages/cadastrar-processos/cadastrar-processos.component';
import { EditarProcessosComponent } from './pages/editar-processos/editar-processos.component';
import { ListarProcessosComponent } from './pages/listar-processos/listar-processos.component';
import { NavibarComponent } from './pages/navibar/navibar.component';
import { confirmExitGuard } from '../guard/confirm-exit.guard';

const routes: Routes = [
  {
    path: 'spregula/cadastrar-processos',
    component: CadastrarProcessosComponent,
    canDeactivate:[
      confirmExitGuard
    ]
  },
  {
    path: 'spregula/edit/:SEI',
    component: EditarProcessosComponent,
    canDeactivate:[
      confirmExitGuard
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'/home'
  },

  {
    path:'login',
    component:NavibarComponent
  },
  {
    path:'processos',
    component: ListarProcessosComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[{
    provide:'confirmExitGuard',
    useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true

  }]
})
export class ProcessosRoutingModule { }
