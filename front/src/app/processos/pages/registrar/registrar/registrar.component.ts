import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioHttpService } from '../../../services/usuario-http.service';
import { IUsuarios } from '../../../../Model/usuarios';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../Material/material.module';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userHttp: UsuarioHttpService
  ) {
    this.userForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      departamento: ['', [Validators.required,Validators.minLength(6)]],
      confirmSenha: ['', [Validators.required]]
    })
  }

  register() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched(); // Marca todos os campos como tocados para exibir os erros de validação
      return;
    }

    const user: IUsuarios = this.userForm.value as IUsuarios;

    if (user.senha !== user.confirmSenha) {
      Swal.fire('Erro!', 'Senhas diferentes!', 'error');
      return;
    }

    this.userHttp.addUser(user).subscribe(() => {
      Swal.fire('Sucesso!', 'Usuário cadastrado com sucesso', 'success');
      this.router.navigateByUrl('/home/login');
    }, (error) => {
      if (error.status === 500) {
        Swal.fire('Erro', 'Usuário já cadastrado', 'error');
      } else if (error.status === 400) {
        Swal.fire('Erro!', 'E-mail inválido', 'error');
      } else {
        Swal.fire('Erro!', 'Falha ao cadastrar usuário.', 'error');
      }
    });
  }
  voltarAosProcessos(): void {
    this.router.navigate(['home/login']);
  }

}
