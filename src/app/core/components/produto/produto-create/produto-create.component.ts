import { ActivatedRoute } from '@angular/router';
import { HeaderService } from './../../../service/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  constructor(private headerService: HeaderService, private activetedRouter: ActivatedRoute,) {
    headerService.headerData = {
      title: this.activetedRouter.snapshot.paramMap.get('id') ? 'Produto/Editar' : 'Produto/Novo',
      icon: 'shopping_cart',
      routerUrl: '/produtos'
    }
  }

  ngOnInit(): void {
  }

}
