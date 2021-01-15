import { HeaderService } from './../../../service/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.css']
})
export class ProdutoReadComponent implements OnInit {

  constructor(private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Lista de Produtos',
      icon: 'shopping_cart',
      routerUrl: '/produtos'
    }
  }
  ngOnInit(): void {
  }

}
