import { Departamento } from './../model/Departamento.model';
import { CrudService } from './../../shared/services/crud-service';
import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DepartamentoService extends CrudService<Departamento> {



    constructor(protected http: HttpClient) {
        super(http, `${environment.apiURLBase}/api/departamentos`);
    }

    loadByID(id) {
        return null;
    }
}