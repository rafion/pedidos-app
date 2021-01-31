import { Marca } from './../model/Marca.model';

import { CrudService } from './../../shared/services/crud-service';
import { Injectable } from '@angular/core';


import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MarcaService extends CrudService<Marca> {



    constructor(protected http: HttpClient) {
        super(http, `${environment.apiURLBase}/api/marcas`);
    }

    loadByID(id) {
        return null;
    }
}