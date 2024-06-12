import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../Material/material.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProcessosHttpService } from '../../services/processos-http.service';
import Swal from 'sweetalert2';
import { IProcessosSexec,DataRecord } from '../../../Model/processos';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
  },
};


@Component({
  selector: 'app-cadastrar-processos',
  standalone: true,
  imports: [MaterialModule, CommonModule, MatMomentDateModule, ReactiveFormsModule],
  templateUrl: './cadastrar-processos.component.html',
  styleUrl: './cadastrar-processos.component.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, DatePipe
  ]

})
export class CadastrarProcessosComponent implements OnInit {
  mainForm: FormGroup;
  private dirty: boolean = false;
  isPrazoRespostaReadonly: boolean = true;
  resultado: string | number | null = null;



  constructor(private fb: FormBuilder,
    private router: Router,
    private http: ProcessosHttpService,
    private datePipe: DatePipe

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
      prazo_resposta: [{ value: '', disabled: true }],
      tm_encaminhamento: [0, Validators.required],
      dias_vencer: ['', Validators.required],
      situacao: ['', Validators.required],
      data_retorno: [0],
      tm_resposta: [0],
      status: ['', Validators.required],
      informacoes_tecnicas: ['Aguardando Retorno da área responsável', Validators.required],
      ponto_sei_enviado_externo: [''],
      data_envio_externo: [''],
      data_preenchimento: [{ value: '', disabled: true }, Validators.required],
      observacao: ['']
    });
    this.mainForm.get('data_entrada_sexec')!.valueChanges.subscribe((value) => {
      this.onRequerenteChange(this.mainForm.get('requerente')!.value);
    });

  }

  ngOnInit(): void {
    this.dataAtual()
  }


  cadastrarProcess() {
    const formValues = this.mainForm.value;

    // Transformar as datas para o formato 'yyyy-MM-dd'
    formValues.data_entrada_regula = this.transformDate(formValues.data_entrada_regula);
    formValues.data_entrada_sexec = this.transformDate(formValues.data_entrada_sexec);
    formValues.data_envio_interno = this.transformDate(formValues.data_envio_interno);
    formValues.data_retorno = this.transformDate(formValues.data_retorno);
    formValues.data_envio_externo = this.transformDate(formValues.data_envio_externo);
    formValues.prazo_resposta = this.transformDate(formValues.prazo_resposta);
    formValues.SEI = formValues.SEI.replace(/[\\s./]/g, '');
    formValues.requerente = formValues.requerente.toLowerCase();

    const process: IProcessosSexec = formValues as IProcessosSexec;

    const dataRecord :DataRecord= {
      prazoResposta: process.prazo_resposta,
      status: process.status,
      dataHoje: new Date(),
      dataEnvioInterno: process.data_envio_interno
    };
    this.resultado = this.calcularPrazo(dataRecord);


    this.http.addProcesso(process).subscribe(() => {
      Swal.fire('Sucesso!', 'Processo cadastrado com sucesso', 'success');
      this.router.navigateByUrl('/processos');
      this.dirty = false;
    },
      (e) => {
        if (e.status === 500) {
          Swal.fire('Erro!', 'SEI já cadastrado', 'error');
        } else if (e.status === 409) {
          Swal.fire('Erro!', 'SEI Inválido', 'error');
        } else {
          Swal.fire('Erro!', 'Falha ao adicionar processo.', 'error');
        }
      });
  }
  dirtyInput() {
    this.dirty = true;
  }

  voltarAosProcessos(): void {
    this.router.navigate(['/processos']);
  }

  onRequerenteChange(value: string) {
    this.isPrazoRespostaReadonly = value.toLowerCase() !== 'tcm';
    const dataEntradaSexecValue = this.mainForm.get('data_entrada_sexec')!.value;

    if (this.isPrazoRespostaReadonly && dataEntradaSexecValue) {
      const dataEntradaSexec = new Date(dataEntradaSexecValue);
      if (!isNaN(dataEntradaSexec.getTime())) {
        dataEntradaSexec.setDate(dataEntradaSexec.getDate() + 15);
        const transformedDate = this.datePipe.transform(dataEntradaSexec, 'yyyy-MM-dd');
        this.mainForm.patchValue({
          prazo_resposta: transformedDate
        });
        this.mainForm.get('prazo_resposta')!.disable();
      } else {
        console.error('Invalid date for data_entrada_sexec:', dataEntradaSexecValue);
      }
    } else {
      this.mainForm.patchValue({
        prazo_resposta: ''
      });
      this.mainForm.get('prazo_resposta')!.enable();
    }
  }

  private transformDate(date: any): string | null {
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        return this.datePipe.transform(parsedDate, 'yyyy-MM-dd');
      }
    }
    return null;
  }

  dataAtual() {
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.mainForm.patchValue({
      data_preenchimento: today
    })
  }
  calcularPrazo(dataRecord : DataRecord) {
    const {prazoResposta,status,dataHoje} = dataRecord

    if(!prazoResposta){
      return ""
    }

    if(status === "Respondido"){
      return 0
    }
    const diferencaPrazo = prazoResposta.getTime() - dataHoje.getTime();
  if (diferencaPrazo < 0) {
    return Math.abs(diferencaPrazo / (1000 * 60 * 60 * 24));
  } else {
    return diferencaPrazo / (1000 * 60 * 60 * 24);
  }
}

  }


