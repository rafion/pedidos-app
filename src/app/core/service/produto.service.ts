import { Produto } from './../model/Produto.model';
import { Observable } from 'rxjs';
import { SnackBarService } from './../../shared/services/snack-bar.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiURL: string = environment.apiURLBase + '/api/produtos';

  constructor(
    private snackBar: SnackBarService,
    private http: HttpClient) { }


  create(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiURL}`, produto)
  }

  update(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiURL}/${produto.id}`, produto);
  }

  findById(id: number): Observable<Produto> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Produto>(url)
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  readAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiURL)
  }



}
