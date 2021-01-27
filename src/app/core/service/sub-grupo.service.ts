import { Observable } from 'rxjs';
import { SubGrupo } from '../model/SubGrupo.model';
import { CrudService } from './../../shared/services/crud-service';
import { Injectable } from '@angular/core';


import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SubGrupoService extends CrudService<SubGrupo> {



    constructor(protected http: HttpClient) {
        super(http, `${environment.apiURLBase}/api/subgrupos`);
    }

    loadByID(id) {
        return null;
    }

    readSubGrupos(grupoId): Observable<SubGrupo[]> {
        const params = new HttpParams()
            .set('grupo', grupoId)
        return this.http.get<any>(`${environment.apiURLBase}/api/subgrupos?${params}`)
        /*.pipe(
          map((obj) => obj),
          catchError(e => this.errorHandler(e))
        ); */
    }
}