import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../../../Material/material.module';
import { IUsuarios } from '../../../../Model/usuarios';
import { UsuarioHttpService } from '../../../services/usuario-http.service';

@Component({
  selector: 'app-edit-users',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-users.component.html',
  styleUrl: './edit-users.component.css'
})
export class EditUsersComponent implements OnInit {
  user!: IUsuarios
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userHttp: UsuarioHttpService,
    private route: ActivatedRoute,
  ) {
    this.userForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      senha: ['', Validators.required],
      departamento: ['', Validators.required],
      permissao: [''],
      confirmSenha: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id') || '0')

    this.userHttp.getUserById(id)
      .subscribe(
        (f) => {
          this.user = f

          this.userForm.patchValue({
            nome: this.user.nome,
            email: this.user.email,
            departatamento: this.user.departamento,
            senha: this.user.senha
          })
        }
      )
  }


  register() {
    const user: IUsuarios = this.userForm.value as IUsuarios;
    this.userHttp.editUser(user).subscribe(() => {
      Swal.fire('Sucesso!', 'Usuário editado com sucesso', 'success');
      this.router.navigateByUrl('/home/login');
    }, (error) => {
      if (error.status === 500) {
        Swal.fire('Erro', 'Usuário já cadastrado', 'error')
      } else if (error.status === 400) {
        Swal.fire('Erro!', 'e-mail Inválido', 'error');
      } else if (user.senha != user.confirmSenha) {
        Swal.fire('Erro!', 'Senhas diferentes!', 'error');
      } else {
        Swal.fire('Erro!', 'Falha ao cadastrar cliente.', 'error');
      }
    }
    )
  }
  voltarAosProcessos(): void {
    this.router.navigate(['home/login']);
  }

}
