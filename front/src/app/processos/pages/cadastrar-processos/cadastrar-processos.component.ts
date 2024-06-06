import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../Material/material.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {trigger,state,style,animate,transition} from '@angular/animations';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessosHttpService } from '../../services/processos-http.service';
import Swal from 'sweetalert2';
import { IProcessosSexec } from '../../../Model/processos';
import 'moment/locale/pt'
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@Component({
  selector: 'app-cadastrar-processos',
  standalone: true,
  imports: [MaterialModule,CommonModule,MatMomentDateModule,ReactiveFormsModule],
  templateUrl: './cadastrar-processos.component.html',
  styleUrl: './cadastrar-processos.component.css',
  animations: [
    trigger('transitionMessages', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]

})
export class CadastrarProcessosComponent implements OnInit {
  mainForm: FormGroup ;
  private dirty: boolean = false;

  constructor(private fb: FormBuilder,
    private route: Router,
    private http: ProcessosHttpService,

  ) {
    this.mainForm = this.fb.group({
      SEI: ['', Validators.required],
      requerente: ['', Validators.required],
      setor_requerente: ['', Validators.required],
      data_entrada_regula: ['', Validators.required],
      data_entrada_sexec: ['', Validators.required],
      unidade_destino: ['', Validators.required],
      objeto: ['', Validators.required],
      tipo_solicitacao: ['', Validators.required],
      descricao_solicitacao: ['', Validators.required],
      ponto_sei_enviado_interno: ['', Validators.required],
      data_envio_interno: ['', Validators.required],
      prazo_resposta: ['', Validators.required],
      tm_encaminhamento: ['', Validators.required],
      dias_vencer: ['', Validators.required],
      situacao: ['', Validators.required],
      data_retorno: ['', Validators.required],
      tm_resposta: ['', Validators.required],
      status: ['', Validators.required],
      informacoes_tecnica: ['', Validators.required],
      ponto_sei_enviado_externo: ['', Validators.required],
      data_envio_externo: ['', Validators.required],
      data_preenchimento: ['', Validators.required],
      observacao: ['', Validators.required]
    });
  }

  ngOnInit(): void {}


  cadastrarProcess(){
    const process: IProcessosSexec = this.mainForm.value as IProcessosSexec;
    this.http.addProcesso(process).subscribe(()=>{
      Swal.fire('Sucesso!', 'Processo cadastrado com sucesso', 'success');
      this.route.navigateByUrl('/processos/sexec')
      this.dirty = false;
    },
    (e)=>{
      if(e.status===500){
        Swal.fire('Erro!', 'SEI já cadastrado', 'error');
      }else if (e.status === 409) {
        Swal.fire('Erro!', 'CPF Inválido', 'error');
      }else {
        Swal.fire('Erro!', 'Falha ao adicionar processo.', 'error');
      }
    }
   )
  }
  dirtyInput() {
    this.dirty = true;
  }


}
