import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { IUsuarios } from '../../Model/usuarios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioHttpService {

  private readonly baseURL = environment.usuario

  constructor(private http: HttpClient) { }

  public addUser(user: IUsuarios): Observable<IUsuarios> {
    return this.http.post<IUsuarios>(`${this.baseURL}`, user)
  }
  public getUserById(id: number): Observable<IUsuarios> {
    return this.http.get<IUsuarios>(`${this.baseURL}/${id}`)
  }
  public editUser(user: IUsuarios): Observable<IUsuarios> {
    return this.http.put<IUsuarios>(`${this.baseURL}/${user.id}`, user)
  }
}
