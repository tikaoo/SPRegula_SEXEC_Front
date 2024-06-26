import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.dev';
import { IProcessosSexec } from '../../Model/processos';
import { Observable, catchError, map, throwError } from 'rxjs';

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

  public getProcessoId(idProcesso: number): Observable<IProcessosSexec> {
    return this.http.get<IProcessosSexec>(`${this.baseURL}/${idProcesso}`)
  }
  public getProcessoSei(SEI: string): Observable<IProcessosSexec> {
    return this.http.get<IProcessosSexec[]>(`${this.baseURL}/spregula/${SEI}`)
      .pipe(
        catchError(error => {
          // Trate erros HTTP aqui, se necessário
          console.error('Erro ao buscar processo:', error);
          return throwError(error);
        }),
        map(response => {
          if (response && response.length > 0) {
            return response[0];
          } else {
            throw new Error('Nenhum processo encontrado com o SEI fornecido.');
          }
        })
      );
  }
  public deleteProcesso(idProcesso: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/${idProcesso}`)
  }
  public deleteProcessoSei(SEI: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/spregula/${SEI}`)
  }
  public addProcesso(processo: IProcessosSexec): Observable<IProcessosSexec> {
    return this.http.post<IProcessosSexec>(`${this.baseURL}`, processo)
  }
  public editProcesso(processo: IProcessosSexec): Observable<IProcessosSexec> {
    return this.http.put<IProcessosSexec>(`${this.baseURL}/spregula/edit/${processo.SEI}`, processo)
  }
}



