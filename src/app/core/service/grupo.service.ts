import { Grupo } from './../model/Grupo.model';
import { CrudService } from './../../shared/services/crud-service';
import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GrupoService extends CrudService<Grupo> {



    constructor(protected http: HttpClient) {
        super(http, `${environment.apiURLBase}/api/grupos`);
    }

    loadByID(id) {
        return null;
    }
}