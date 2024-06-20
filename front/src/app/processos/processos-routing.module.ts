import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarProcessosComponent } from './pages/cadastrar-processos/cadastrar-processos.component';
import { EditarProcessosComponent } from './pages/editar-processos/editar-processos.component';
import { ListarProcessosComponent } from './pages/listar-processos/listar-processos.component';
import { NavibarComponent } from './pages/navibar/navibar.component';

const routes: Routes = [
  {
    path: 'spregula/cadastrar-processos',
    component: CadastrarProcessosComponent
  },
  {
    path: 'spregula/edit/:SEI',
    component: EditarProcessosComponent
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
  exports: [RouterModule]
})
export class ProcessosRoutingModule { }
