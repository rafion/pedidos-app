import { Endereco } from './../model/Endereco.model';
import { Injectable } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  apiURL: string = environment.apiURLBase + '/api/enderecos';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient) { }


  deleteById(id: number): Observable<Endereco> {
    return this.http.delete<Endereco>(`${this.apiURL}/${id}`);
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
    this.showMessage('erro ao obter os dados da API! ' + e, true);
    return EMPTY; //retorna um observable do tipo empty
  }
}
