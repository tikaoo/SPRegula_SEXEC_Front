import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUsuarios } from '../../Model/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private readonly baseUrl = environment.login
  private logged$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private http:HttpClient) { }

  login(usuario: IUsuarios): Observable<{Authorization: string}> {
    return this.http.post<{Authorization: string}>(`${this.baseUrl}/login`, usuario)
      .pipe(
        tap((response) => {
          console.log('Login response:', response); // Log da resposta do login
          const token = response.Authorization;
          if (token) {
            localStorage.setItem('token', token);
            console.log('Token saved in localStorage:', token); // Log do token salvo
            this.logged$.next(true);
          } else {
            console.error('Token is undefined');
          }
        })
      );
  }
  logged():Observable<boolean>{
    return this.logged$.asObservable()
  }
}
