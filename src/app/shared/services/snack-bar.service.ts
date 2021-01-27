import { Observable, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

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
