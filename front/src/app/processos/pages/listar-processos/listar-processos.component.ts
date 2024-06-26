import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../Material/material.module';
import { IProcessosSexec } from '../../../Model/processos';
import { Router, RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ProcessosHttpService } from '../../services/processos-http.service';
import Swal from 'sweetalert2';
import { CommonModule, NgIf } from '@angular/common';
import { AuthenticationServiceService } from '../../services/authentication-service.service';


@Component({
  selector: 'app-listar-processos',
  standalone: true,
  imports: [MaterialModule, RouterModule, MatTableModule, MatSortModule, MatPaginatorModule, NgIf, CommonModule],
  templateUrl: './listar-processos.component.html',
  styleUrl: './listar-processos.component.css'
})
export class ListarProcessosComponent implements OnInit, AfterViewInit {

  processos: IProcessosSexec[] = []
  noProcessosMessage: string = '';

  columns: string[] = ['SEI', 'requerente', 'setor_requerente', 'data_entrada_regula', 'data_entrada_sexec', 'unidade_destino', 'objeto', 'tipo_solicitacao',
    'descricao_solicitacao', 'ponto_sei_enviado_interno', 'data_envio_interno', 'prazo_resposta', 'tm_encaminhamento', 'dias_vencer', 'situacao', 'data_retorno', 'tm_resposta', 'status',
    'informacoes_tecnicas', 'ponto_sei_enviado_externo', 'data_envio_externo', 'data_preenchimento', 'observacao', 'actions']


  dataSource = new MatTableDataSource(this.processos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private processHttpService: ProcessosHttpService,
    private router: Router,
    private authService: AuthenticationServiceService
  ) { }

  ngOnInit(): void {
    this.recoveryProcessos()

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource.filteredData.length === 0) {
      Swal.fire('Erro!', 'Nenhum processo encontrado', 'error');
    }
  }
  recoveryProcessos(): void {
    this.processHttpService.getProcessos().subscribe(
      (processSexec) => {
        this.processos = processSexec;
        if (this.processos.length === 0) {
          Swal.fire({
            title: 'Nenhum processo encontrado.',
            icon: 'warning'
          });
        } else {
          this.noProcessosMessage = '';
        }
      },
      (error) => {
        console.error('Erro ao recuperar processos:', error);
        this.noProcessosMessage = 'Erro ao recuperar processos.';
      }
    );
  }

  deleteProcess(SEI: string): void {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este processo SEI?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.processHttpService.deleteProcessoSei(SEI).subscribe(
          () => {
            Swal.fire('Sucesso!', 'Processo deletado com sucesso', 'success');
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/home/processos']);
              });
          },
          (e) => {
            Swal.fire('Erro!', 'Falha ao excluir processo!', 'error');
          }
        );
      }
    });
  }
  // Função para formatar a data
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  }
  getRowClass(process: IProcessosSexec): string {
    if (process.situacao === 'vencido') {
      return 'row-vencido';
    } else if (process.situacao === 'proximo_vencimento') {
      return 'row-proximo-vencimento';
    } else if (process.situacao === 'respondido') {
      return 'row-respondido';
    }
    return '';
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home/login']); // Substitua '/login' pela rota da página de login
  }

}



