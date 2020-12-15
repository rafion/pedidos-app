import { Cep } from './../model/cep';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string): Observable<Cep> {
    //nova variavel "cep" somento com digitos
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      //expressão regular para validadar o CEP
      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        return this.http.get<Cep>(`//viacep.com.br/ws/${cep}/json`);
      } else {
        //cep é inválido
        alert("Formato de CEP inválido.");
      }
    }
  }
}
