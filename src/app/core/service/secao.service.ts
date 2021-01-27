import { Secao } from './../model/Secao.model';
import { CrudService } from './../../shared/services/crud-service';
import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SecaoService extends CrudService<Secao> {



    constructor(protected http: HttpClient) {
        super(http, `${environment.apiURLBase}/api/secoes`);
    }

    loadByID(id) {
        return null;
    }
}