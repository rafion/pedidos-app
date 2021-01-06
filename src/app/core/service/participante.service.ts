//import { ConsultaCepService } from './../../shared/services/consulta-cep.service';
import { Participante } from '../model/Participante.model';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ParticipanteResumoDTO } from '../components/participante/participante-read/participante-resumo.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  apiURL: string = environment.apiURLBase + '/api/participantes';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient) { }





  //salva e retorna um Observable de produtos
  //pipe com um map para tratar o erro na criação do produto, se ocorrer
  create(participante: Participante): Observable<Participante> {
    return this.http.post<Participante>(`${this.apiURL}`, participante)
    /* .pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e)) //pega o erro "e" e passa para função
    );
    */

  }

  read(): Observable<Participante[]> {
    return this.http.get<Participante[]>(this.apiURL).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readTable(): Observable<ParticipanteResumoDTO[]> {
    return this.http.get<ParticipanteResumoDTO[]>(this.apiURL).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Participante> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Participante>(url)
      .pipe(
        map((obj) => obj),
        catchError(e => this.errorHandler(e))
      );

  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success'] //classes permitidas, no casso a da msg de sucesso verde

    });

  }

  errorHandler(e: any): Observable<any> {
    // console.log(e);
    this.showMessage('erro ao obter os contatos da API! ' + e, true);
    return EMPTY; //retorna um observable do tipo empty
  }


}

