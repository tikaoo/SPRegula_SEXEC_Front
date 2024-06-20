import { RouterModule,Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'

 export const routes: Routes = [
  {
    path: 'home',
    loadChildren: async () => { // Lazy Loading
      const m = await import('./processos/processos.module');
      return m.ProcessosModule;

    }
  },
 ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class AppRoutingModule {}
