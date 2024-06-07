import { CommonModule} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MaterialModule } from '../../../Material/material.module';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MY_DATE_FORMATS } from '../cadastrar-processos/cadastrar-processos.component';
import { IProcessosSexec } from '../../../Model/processos';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessosHttpService } from '../../services/processos-http.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-editar-processos',
  standalone: true,
  imports: [MaterialModule, CommonModule, MatMomentDateModule, ReactiveFormsModule],
  templateUrl: './editar-processos.component.html',
  styleUrl: './editar-processos.component.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class EditarProcessosComponent implements OnInit {

  process!: IProcessosSexec
  processosForm: FormGroup

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: ProcessosHttpService,
    private route: ActivatedRoute,


  ) {
    this.processosForm = this.fb.group({
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
      informacoes_tecnicas: ['', Validators.required],
      ponto_sei_enviado_externo: ['', Validators.required],
      data_envio_externo: ['', Validators.required],
      data_preenchimento: ['', Validators.required],
      observacao: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    const iSEI: string = this.route.snapshot.paramMap.get('SEI') || '';
    if (iSEI) {
      this.http.getProcessoSei(iSEI).subscribe(
        (response) => {
          this.process = response;
            this.processosForm.setValue({
            SEI: this.process.SEI,
            requerente: this.process.requerente,
            setor_requerente: this.process.setor_requerente,
            data_entrada_regula: this.process.data_entrada_regula,
            data_entrada_sexec: this.process.data_entrada_sexec,
            unidade_destino: this.process.unidade_destino,
            objeto: this.process.objeto,
            tipo_solicitacao: this.process.tipo_solicitacao,
            descricao_solicitacao: this.process.descricao_solicitacao,
            ponto_sei_enviado_interno: this.process.ponto_sei_enviado_interno,
            data_envio_interno: this.process.data_envio_interno,
            prazo_resposta: this.process.prazo_resposta,
            tm_encaminhamento: this.process.tm_encaminhamento,
            dias_vencer: this.process.dias_vencer,
            situacao: this.process.situacao,
            data_retorno: this.process.data_retorno,
            tm_resposta: this.process.tm_resposta,
            status: this.process.status,
            informacoes_tecnicas: this.process.informacoes_tecnicas,
            ponto_sei_enviado_externo: this.process.ponto_sei_enviado_externo,
            data_envio_externo: this.process.data_envio_externo,
            data_preenchimento: this.process.data_preenchimento,
            observacao: this.process.observacao
          });
        }
      );
    }
  }
  atualizar(): void {
    const numeroSei: IProcessosSexec = this.processosForm.value as IProcessosSexec
    this.http
      .editProcesso(numeroSei)
      .subscribe(
        (result) => {
          Swal.fire(
            'Sucesso!',
            'Processo atualizado com sucesso',
            'success'
          )
          this.processosForm.reset()
          this.router.navigateByUrl('/processos/sexec')
        },
        () => {
          Swal.fire(
            'Erro!',
            'Falha ao atualizar processo.',
            'error'

          )
        }
      )
  }


}
