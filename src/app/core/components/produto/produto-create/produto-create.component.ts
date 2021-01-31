import { UnidadeMedidaService } from './../../../service/unidadeMedida.service';
import { UnidadeMedida } from './../../../model/UnidadeMedida.model';
import Swal from 'sweetalert2';
import { MarcaService } from './../../../service/marca.service';
import { Marca } from './../../../model/Marca.model';
import { Grupo } from './../../../model/Grupo.model';
import { SubGrupo } from './../../../model/SubGrupo.model';
import { tap, map, switchMap } from 'rxjs/operators';
import { GrupoService } from './../../../service/grupo.service';
import { SubGrupoService } from './../../../service/sub-grupo.service';

import { ProdutoService } from './../../../service/produto.service';
import { Produto } from './../../../model/Produto.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from './../../../../shared/services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from './../../../service/header.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CodBarra } from 'src/app/core/model/CodBarra.model';
import { empty, NEVER, Observable } from 'rxjs';


@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {
  //usado para setar o valor da marca ao carregar os dados da api


  produtoForm: FormGroup;

  produto: Produto = new Produto();
  codBarras: CodBarra[] = [];
  subGrupos: SubGrupo[] = [];
  grupos: Grupo[] = [];
  marcas: Marca[] = [];
  unidadeMedidas: UnidadeMedida[] = [];

  constructor(
    private produtoService: ProdutoService,
    private headerService: HeaderService,
    private activetedRouter: ActivatedRoute,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private subGrupoService: SubGrupoService,
    private grupoService: GrupoService,
    private marcaService: MarcaService,
    private unidadeMedidaService: UnidadeMedidaService
  ) {
    headerService.headerData = {
      title: this.activetedRouter.snapshot.paramMap.get('id') ? 'Produto/Editar' : 'Produto/Novo',
      icon: 'shopping_cart',
      routerUrl: '/produtos'
    }
  }

  ngOnInit(): void {

    this.initForm();
    this.getGrupos();
    this.getUnidadeMedidas();
    this.getMarcas()

    //pega o id da rota
    const id = +this.activetedRouter.snapshot.paramMap.get('id')
    if (id) { this.findById(id); }
  }

  getSubGrupos(id: number) {

    return this.subGrupoService.readSubGrupos(id)
      .pipe(
        map((subGrupos: SubGrupo[]) => subGrupos.filter(sg => sg.grupo.id == id))
      );

  }

  getGrupos() {
    this.grupoService.list().subscribe(response => {
      this.grupos = response

    }, errorResponse => {
      this.snackBarService.showMessage('erro ao carregar os Grupos', true),
        console.log(errorResponse)
    })
  }

  getUnidadeMedidas() {
    this.unidadeMedidaService.list().subscribe(response => {
      this.unidadeMedidas = response

    }, errorResponse => {
      this.snackBarService.showMessage('erro ao carregar os Unidade de medidas', true),
        console.log(errorResponse)
    })
  }

  getMarcas() {
    this.marcaService.list().subscribe(response => {
      this.marcas = response
    }, errorResponse => {
      this.snackBarService.showMessage('erro ao carregar as Marcas', true),
        console.log(errorResponse)
    })
  }

  initForm() {


    this.produtoForm = this.formBuilder.group({
      produto: this.formBuilder.group({
        id: [null],
        descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(75)]],
        referencia: [''],
        precoVenda: [null],
        precoCompra: [null],
        data_validade: [null],
        grupo: [null, [Validators.required]],
        subGrupo: [null, [Validators.required]],
        ativo: [true],
        unidadeMedida: [1, [Validators.required]],
        ncm: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        marca: [1, [Validators.required]]
      }),
      codBarra: this.formBuilder.group({
        id: [null],
        codBarra: ['', [Validators.minLength(7), Validators.maxLength(13)]],
        produto: [null],
        ativo: [true],
        fator: [1],
        favorito: [true]
      })

    })
    //quando o formulario inicializa, chama novamente o metodo

    //this.onChanges();
  }

  selectSubGrupo(event) {
    console.log('evento ao clicar no grupo');
    console.log(event.value);

    this.getSubGrupos(event.value).subscribe(response => {
      this.subGrupos = response
    }, errorResponse => {
      this.snackBarService.showMessage('erro ao carregar os SubGrupos', true),
        console.log(errorResponse)
    })
  }

  onSubmit() {
    if (this.produtoForm.valid) {

      this.produto = this.produtoForm.value.produto;
      this.codBarras.push(this.produtoForm.value.codBarra);
      this.produto.codBarras = this.codBarras;
      // this.produto.subGrupo = this.produtoForm.value.subGrupo;
      //this.produto.codBarras.push(this.produtoForm.value.codBarra);
      //atualiza tabelas
      this.codBarras = Array.from(this.codBarras);
      console.log(this.produto)
      if (this.produto.id) {
        console.log('produto com id para enviar')
        console.log(this.produto)

        //this.produto.codBarra = this.codBarra;
        this.produtoService.update(this.produto).subscribe(response => {
          console.log('dados Retornados')
          console.log(response);
          this.updateForm(response);
          this.snackBarService.showMessage('Produto atualizado  Com sucesso!!', false);
        }, errorResponse => {
          this.codBarras.pop();
          this.codBarras = Array.from(this.codBarras);
          console.log(errorResponse.error.messagem);
          this.snackBarService.showMessage('erro ao atualizar produto', true);
        }
        )
      } else {
        //this.produto.codBarra = this.codBarra;
        this.produtoService.create(this.produto).subscribe(response => {
          console.log('dados do response')
          console.log(response);
          this.updateForm(response);
          this.snackBarService.showMessage('produto Criado Com sucesso!!', false);
        }, errorResponse => {
          console.log(errorResponse.error.messagem);
          this.codBarras.pop();
          this.codBarras = Array.from(this.codBarras);
          this.snackBarService.showMessage('erro ao criar produto', true);
        }
        )
      }
    } else {
      this.snackBarService.showMessage('Verifique os campos do formulario', true);
    }
  }

  updateForm(produto: Produto) {
    this.produto = produto;
    this.codBarras = [];
    //this.subGrupos = []; //encontrar forma de setar no formulario, mesmo com a lista carregada
    //this.marcas = [];//encontrar forma de setar no formulario, mesmo com a lista carregada
    //this.marcas.push(produto.marca)//encontrar forma de setar no formulario, mesmo com a lista carregada
    this.subGrupos.push(produto.subGrupo);//encontrar forma de setar no formulario, mesmo com a lista carregada
    console.log('subgrupos carregados no form');
    console.log(this.subGrupos)

    let codBarraFavorito: CodBarra[] = produto.codBarras.filter(e => e.favorito == true);
    this.produtoForm.patchValue({
      produto: {
        id: produto.id,
        descricao: produto.descricao,
        precoCompra: produto.precoCompra,
        precoVenda: produto.precoVenda,
        dataValidade: produto.dataValidade,
        ncm: produto.ncm,
        referencia: produto.referencia,
        grupo: produto.grupo.id,
        unidadeMedida: produto.unidadeMedida.id,
        subGrupo: produto.subGrupo.id,
        marca: produto.marca.id,
      },
      codBarra: {
        id: codBarraFavorito[0].id,
        codBarra: codBarraFavorito[0].codBarra,
        produto: codBarraFavorito[0].produto,
        ativo: codBarraFavorito[0].ativo,
        fator: codBarraFavorito[0].fator,
        favorito: codBarraFavorito[0].favorito

      }

    })
    //this.produtoForm.get('produto.marca').patchValue(produto.marca);

    console.log('forumlario inicializado:')
    console.log(this.produtoForm.value)
    //console.log('valor do grupo ao iniciar o form: ', this.produtoForm.get('produto.grupo').value);
    // console.log('valor grupo no subgrupo ao iniciar o form: ', this.produtoForm.get(['produto', 'subGrupo']).value['grupo']['id'])
    //this.idGrupo = this.produtoForm.get('produto.grupo').value;
    //this.idGrupoSubGrupo = this.produtoForm.get(['produto', 'subGrupo']).value['grupo']['id'];
  }

  cancel(): void {
    this.router.navigate(['/produtos'])
  }

  resetForm() {
    this.produtoForm.reset();
    this.initForm();
    this.produto = new Produto(); //se interface: <Produto>{};
    this.codBarras = [];
    this.subGrupos = [];



  }

  findById(id) {
    if (id) {
      this.produtoService.findById(id).subscribe(dados => {
        this.updateForm(dados)
      }
        , errorResponse => {
          if (errorResponse.status == 404) {
            this.snackBarService.showMessage('Produto não encontrado!', true)
            this.resetForm();
            console.log('Produto não encontrado!');
          }
          this.produto = new Produto();
        }
      );
    }
  }

  addMarca() {

    Swal.fire({
      title: 'Informe a nova marca',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f44336',
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        if (result.value.length >= 3 && result.value.length < 80) {
          let marca = new Marca();
          marca.nome = result.value.toUpperCase();
          this.marcaService.save(marca).subscribe((response: Marca) => {
            this.getMarcas();
            Swal.fire('Marca', `${response.nome}, Salva com sucesso`)
          }, errorMesssage => {
            Swal.fire(`${result.value}`, '', 'info')
          });
        } else if (result.value.length <= 2 || result.value == "") {
          Swal.fire(`${result.value}`, 'valor invalido', 'error')

        }
      }



    }

    )
  }

}
