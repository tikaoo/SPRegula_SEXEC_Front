import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { IProcessosSexec } from '../../Model/processos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessosHttpService {

  private readonly baseURL = environment.apiSexec
  private readonly baseURL2 = environment.apiGip

  constructor(private http: HttpClient) { }

public getProcessos(): Observable<IProcessosSexec[]> {
    return this.http.get<IProcessosSexec[]>(this.baseURL)
  }

  public getProcessoId(idProcesso: number):Observable<IProcessosSexec>{
    return this.http.get<IProcessosSexec>(`${this.baseURL}/${idProcesso}`)
  }
  public getProcessoSei(SEI: number):Observable<IProcessosSexec>{
    return this.http.get<IProcessosSexec>(`${this.baseURL}/${SEI}`)
  }
  public deleteProcesso(idProcesso: number): Observable<void>{
    return this.http.delete<void>(`${this.baseURL}/${idProcesso}`)
  }
  public deleteProcessoSei(SEI: number): Observable<void>{
    return this.http.delete<void>(`${this.baseURL}/${SEI}`)
  }
  public addProcesso(processo: IProcessosSexec):Observable<IProcessosSexec>{
    return this.http.post<IProcessosSexec>(`${this.baseURL}`,processo)
  }
  public editProcesso(processo: IProcessosSexec): Observable<IProcessosSexec>{
    return this.http.put<IProcessosSexec>(`${this.baseURL}/${processo.SEI}`,processo)
  }
}



