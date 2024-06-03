import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarProcessosComponent } from './pages/cadastrar-processos/cadastrar-processos.component';
import { EditarProcessosComponent } from './pages/editar-processos/editar-processos.component';
import { ListarProcessosComponent } from './pages/listar-processos/listar-processos.component';
import { ProcessoComponent } from './processo/processo.component';

const routes: Routes = [
  {
    path: 'cadastrar-processos',
    component: CadastrarProcessosComponent
  },
  {
    path: 'edit/:id',
    component: EditarProcessosComponent
  },
  {
    path: 'listar-processos',
    pathMatch: 'full',
    component: ListarProcessosComponent
  },
  {
    path: ':idProcesso',
    component: ProcessoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessosRoutingModule { }
