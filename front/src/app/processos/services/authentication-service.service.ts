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
  private logged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) { }

  login(usuario: IUsuarios): Observable<{ Authorization: string }> {
    return this.http.post<{ Authorization: string }>(`${this.baseUrl}/login`, usuario)
      .pipe(
        tap((response) => {
          const token = response.Authorization;
          if (token) {
            localStorage.setItem('token', token);
            this.logged$.next(true);
          } else {

          }
        })
      );
  }
  logged(): Observable<boolean> {
    return this.logged$.asObservable()
  }
  logout(): void {
    localStorage.removeItem('token');
    this.logged$.next(false);
  }

}
