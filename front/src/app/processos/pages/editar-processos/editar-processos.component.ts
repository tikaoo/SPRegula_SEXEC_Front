import { CommonModule, DatePipe } from '@angular/common';
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
import { ICanDeActivate } from '../../../Model/candeActivate';



@Component({
  selector: 'app-editar-processos',
  standalone: true,
  imports: [MaterialModule, CommonModule, MatMomentDateModule, ReactiveFormsModule],
  templateUrl: './editar-processos.component.html',
  styleUrl: './editar-processos.component.css',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, DatePipe
  ]
})
export class EditarProcessosComponent implements OnInit, ICanDeActivate {
  private dirty: boolean = false;
  process!: IProcessosSexec
  processosForm: FormGroup

  constructor(private fb: FormBuilder,
    private router: Router,
    private http: ProcessosHttpService,
    private route: ActivatedRoute,
    private datePipe: DatePipe


  ) {
    this.processosForm = this.fb.group({
      SEI: [{ value: '', disabled: true }, Validators.required],
      requerente: [{ value: '', disabled: true }, Validators.required],
      setor_requerente: [{ value: '', disabled: true }, Validators.required],
      data_entrada_regula: [{ value: '', disabled: true }, Validators.required],
      data_entrada_sexec: [{ value: '', disabled: true }, Validators.required],
      unidade_destino: [{ value: '', disabled: true }, Validators.required],
      objeto: [{ value: '', disabled: true }, Validators.required],
      tipo_solicitacao: [{ value: '', disabled: true }, Validators.required],
      descricao_solicitacao: [{ value: '', disabled: true }, Validators.required],
      ponto_sei_enviado_interno: [{ value: '', disabled: true }, Validators.required],
      data_envio_interno: [{ value: '', disabled: true }, Validators.required],
      prazo_resposta: [{ value: '', disabled: true }, Validators.required],
      tm_encaminhamento: [{ value: '', disabled: true }, Validators.required],
      dias_vencer: [{ value: '', disabled: true }, Validators.required],
      situacao: [{ value: '', disabled: true }, Validators.required],
      data_retorno: ['', Validators.required],
      tm_resposta: [{ value: '', disabled: true }, Validators.required],
      status: ['', Validators.required],
      informacoes_tecnicas: ['', Validators.required],
      ponto_sei_enviado_externo: ['', Validators.required],
      data_envio_externo: ['', Validators.required],
      data_preenchimento: [{ value: '', disabled: true }, Validators.required],
      observacao: ['', Validators.required]
    });
    this.processosForm.get('data_retorno')?.valueChanges.subscribe(() => {
      this.calcularTM();
      this.atualizarDiasVencer();  // Chamar a função para atualizar dias_vencer
      this.atualizarSituacao();  // Atualizar a situação com base em dias_vencer
    });
  }


  ngOnInit(): void {
    const iSEI: string = this.route.snapshot.paramMap.get('SEI') || '';
    if (iSEI) {
      this.http.getProcessoSei(iSEI).subscribe(
        (response) => {
          this.process = response;
          this.processosForm.patchValue({
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
    const formValues = this.processosForm.getRawValue(); // Obtém todos os valores, incluindo os campos desabilitados

    // Transformar as datas conforme necessário
    formValues.data_entrada_regula = this.datePipe.transform(formValues.data_entrada_regula, 'yyyy-MM-dd');
    formValues.data_entrada_sexec = this.datePipe.transform(formValues.data_entrada_sexec, 'yyyy-MM-dd');
    formValues.data_envio_interno = this.datePipe.transform(formValues.data_envio_interno, 'yyyy-MM-dd');
    formValues.prazo_resposta = this.datePipe.transform(formValues.prazo_resposta, 'yyyy-MM-dd');
    formValues.data_retorno = this.datePipe.transform(formValues.data_retorno, 'yyyy-MM-dd');
    formValues.data_envio_externo = this.datePipe.transform(formValues.data_envio_externo, 'yyyy-MM-dd');
    formValues.data_preenchimento = this.datePipe.transform(formValues.data_preenchimento, 'yyyy-MM-dd');



    // Criar um objeto para os campos que precisam ser atualizados no banco de dados
    const numeroSei: IProcessosSexec = {
      SEI: formValues.SEI,
      requerente: formValues.requerente,
      setor_requerente: formValues.setor_requerente,
      data_entrada_regula: formValues.data_entrada_regula,
      data_entrada_sexec: formValues.data_entrada_sexec,
      unidade_destino: formValues.unidade_destino,
      objeto: formValues.objeto,
      tipo_solicitacao: formValues.tipo_solicitacao,
      descricao_solicitacao: formValues.descricao_solicitacao,
      ponto_sei_enviado_interno: formValues.ponto_sei_enviado_interno,
      data_envio_interno: formValues.data_envio_interno,
      prazo_resposta: formValues.prazo_resposta,
      tm_encaminhamento: formValues.tm_encaminhamento,
      dias_vencer: formValues.dias_vencer,
      situacao: formValues.situacao,
      data_retorno: formValues.data_retorno,
      tm_resposta: formValues.tm_resposta,
      status: formValues.status,
      informacoes_tecnicas: formValues.informacoes_tecnicas,
      ponto_sei_enviado_externo: formValues.ponto_sei_enviado_externo,
      data_envio_externo: formValues.data_envio_externo,
      data_preenchimento: formValues.data_preenchimento,
      observacao: formValues.observacao
    };

    this.http
      .editProcesso(numeroSei)
      .subscribe(
        (result) => {
          Swal.fire(
            'Sucesso!',
            'Processo atualizado com sucesso',
            'success'
          );
          this.processosForm.reset();
          this.router.navigateByUrl('home/processos');
          this.desativarGuard()
        },
        () => {
          Swal.fire(
            'Erro!',
            'Falha ao atualizar processo.',
            'error'
          );
        }
      );
  }
  voltarAosProcessos(): void {
    this.router.navigate(['home/processos']);
  }
  atualizarSituacao() {
    const diasVencer = this.processosForm.get('dias_vencer')!.value
    if (diasVencer > 15) {
      this.processosForm.patchValue({ situacao: 'Vencido' });
    } else if (diasVencer <= 2) {
      this.processosForm.patchValue({ situacao: 'Próximo ao prazo' });
    } else {
      this.processosForm.patchValue({ situacao: 'No prazo' });
    }
  }
  atualizarDiasVencer() {
    const prazoResposta = this.processosForm.get('prazo_resposta')!.value;
    const dataAtual = new Date();
    const prazoRespostaDate = new Date(prazoResposta);

    if (!isNaN(prazoRespostaDate.getTime())) {
      const diffInMs = prazoRespostaDate.getTime() - dataAtual.getTime();
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

      this.processosForm.patchValue({
        dias_vencer: Math.round(diffInDays)
      });
    }
  }

  calcularTM() {
    const dataEnvioInterno = this.processosForm.get('data_envio_interno')!.value;
    const prazoResposta = this.processosForm.get('data_retorno')!.value;

    if (dataEnvioInterno && prazoResposta) {
      const dataEnvioInternoDate = new Date(dataEnvioInterno);
      const prazoRespostaDate = new Date(prazoResposta);

      if (!isNaN(dataEnvioInternoDate.getTime()) && !isNaN(prazoRespostaDate.getTime())) {
        // Verifica se a data de retorno é menor que a data de envio interno
        if (prazoRespostaDate < dataEnvioInternoDate) {
          // Exibe mensagem de erro na tela (substitua por sua lógica de exibição de mensagem)
          Swal.fire(
            'Erro!',
            'data de retorno não pode ser menor que a data de envio interno, verifique!.',
            'error'
          );
          return;
        }
        const diffInMs = prazoRespostaDate.getTime() - dataEnvioInternoDate.getTime();
        const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

        this.processosForm.patchValue({
          tm_resposta: diffInDays
        });
      }
    }
  }
  mudarRota() {
    if (this.processosForm.dirty) {
      return new Promise<boolean>((resolve) => {
        Swal.fire({
          title: 'Tem certeza que deseja sair dessa página?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não',
        }).then((result) => {
          if (result.isConfirmed) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    } else {
      return Promise.resolve(true);
    }
  }
  desativarGuard() {
    return this.mudarRota();
  }



}
