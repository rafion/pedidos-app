import { UnidadeMedida } from './../model/UnidadeMedida.model';
import { CrudService } from './../../shared/services/crud-service';
import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UnidadeMedidaService extends CrudService<UnidadeMedida> {



    constructor(protected http: HttpClient) {
        super(http, `${environment.apiURLBase}/api/unidade-medidas`);
    }

    loadByID(id) {
        return null;
    }
}