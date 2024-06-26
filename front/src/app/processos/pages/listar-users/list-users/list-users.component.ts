import { NgIf, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../Material/material.module';
import { IUsuarios } from '../../../../Model/usuarios';
import { UsuarioHttpService } from '../../../services/usuario-http.service';
import Swal from 'sweetalert2';
import { AuthenticationServiceService } from '../../../services/authentication-service.service';


@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [MaterialModule, RouterModule, MatTableModule, MatSortModule, MatPaginatorModule, NgIf, CommonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {

  users: IUsuarios[] = []
  noUserMessage: string = '';

  columns: string[] = ['nome', 'email', 'departamento', 'senha', 'actions']

  constructor(
    private userService: UsuarioHttpService,
    private router: Router,
    private authService: AuthenticationServiceService) { }
  ngOnInit(): void {
    this.recoveryUsers();
  }

  recoveryUsers(): void {
    this.userService.getUsers().subscribe(
      (usuario) => {
        this.users = usuario;
        if (this.users.length === 0) {
          Swal.fire({
            title: 'Nenhum usuário encontrado.',
            icon: 'warning'
          });
        } else {
          this.noUserMessage = '';
        }
      },
      (error) => {
        console.error('Erro ao recuperar usuários:', error);
        this.noUserMessage = 'Erro ao recuperar usuários.';
      }
    );
  }
  deleteUsers(id: number): void {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este usuário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delUsers(id).subscribe(
          () => {
            Swal.fire('Sucesso!', 'Usuário deletado com sucesso', 'success');
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/home/users']);
              });
          },
          (e) => {
            Swal.fire('Erro!', 'Falha ao excluir usuário!', 'error');
          }
        );
      }
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home/login']); // Substitua '/login' pela rota da página de login
  }
}
