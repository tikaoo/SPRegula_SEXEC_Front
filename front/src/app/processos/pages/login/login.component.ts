import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../Material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../../services/authentication-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  isSignDivVisiable: boolean  = true;

  usuario: FormGroup = this.fb.group({
    email: ['', [ Validators.required ]],
    senha: ['', [ Validators.required, Validators.minLength(6) ]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthenticationServiceService
  ) { }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.usuario.valid) {
      this.authService.login(this.usuario.value)
        .subscribe(() => {
          this.router.navigate(['/home/processos']);
        }, (error) => {
          console.error('Login error', error);
        });
    } else {
      console.log('Form is invalid');
    }
  }
  voltarAosProcessos(): void {
    this.router.navigate(['home/registrar']);
  }
}
