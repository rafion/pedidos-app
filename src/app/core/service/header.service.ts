import { HeaderData } from './../model/header-data.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  //BehaviorSubject é quem escuta o evento (o porteiro)
  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'início',
    icon: 'home',
    routerUrl: ''
  })

  constructor() { }

  get headerData(): HeaderData {
    return this._headerData.value
  }

  set headerData(headerData: HeaderData) {
    this._headerData.next(headerData)
  }

}
