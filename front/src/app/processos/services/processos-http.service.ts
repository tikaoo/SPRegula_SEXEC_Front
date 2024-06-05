import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { IProcessos } from '../../Model/processos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessosHttpService {

  private readonly baseURL = environment.api
  constructor(private http: HttpClient) { }

public getProcessos(): Observable<IProcessos[]> {
    return this.http.get<IProcessos[]>(this.baseURL)
  }
}



