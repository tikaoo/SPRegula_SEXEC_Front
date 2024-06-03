import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessosRoutingModule } from './processos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProcessosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,




  ],
  providers: [

  ],
})
export class ProcessosModule { }
