import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from '../model/Estado.model';
import { Municipio } from '../model/Municipio.model';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get<Estado[]>('assets/dados/estados.json');
  }

  getMunicipios(codigo_uf: number) {
    return this.http.get<Municipio[]>('assets/dados/municipios.json')
      .pipe(
        // tslint:disable-next-line:triple-equals
        map((municipios: Municipio[]) => municipios.filter(c => c.codigo_uf == codigo_uf))
      );
  }

}
