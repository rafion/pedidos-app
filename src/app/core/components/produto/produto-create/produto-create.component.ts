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
import { Component, OnInit } from '@angular/core';
import { CodBarra } from 'src/app/core/model/CodBarra.model';
import { empty, NEVER, Observable } from 'rxjs';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produtoForm: FormGroup;

  produto: Produto = new Produto();
  //codBarra: codBarra = new codBarra();
  //auxiliar para funcionar o formulario junto com o array
  codBarras: CodBarra[] = [];
  //subGrupo: SubGrupo;
  subGrupos: SubGrupo[] = [];
  //grupos: Grupo[] = [];
  grupos: Observable<Grupo[]>;

  constructor(
    private produtoService: ProdutoService,
    private headerService: HeaderService,
    private activetedRouter: ActivatedRoute,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private subGrupoService: SubGrupoService,
    private grupoService: GrupoService
  ) {
    headerService.headerData = {
      title: this.activetedRouter.snapshot.paramMap.get('id') ? 'Produto/Editar' : 'Produto/Novo',
      icon: 'shopping_cart',
      routerUrl: '/produtos'
    }
  }

  ngOnInit(): void {

    this.initForm();
    this.grupos = this.grupoService.list();
    //this.getGrupos();




    /*carrega os subgrupos a partir do grupo
    this.produtoForm.get('produto.grupo').valueChanges
      .pipe(
        tap(grupo => console.log('Novo grupo: ', grupo)),
        map(id => this.grupos.filter(e => e.id === id)),
        map(grupos => grupos && grupos.length > 0 ? grupos[0].id : empty()),
        switchMap((id: number) => this.getSubGrupos(id)),
        tap(console.log)
      )
      .subscribe(subGrupos => this.subGrupos = subGrupos);
*/

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

  /*getGrupos() {
    //carrega os grupos
    this.grupoService.list().subscribe(response => {
      this.grupos = response
    }, errorResponse => {
      this.snackBarService.showMessage('erro ao carregar os Grupos', true),
        console.log(errorResponse)
    })
  }
  */

  initForm() {

    this.produtoForm = this.formBuilder.group({
      produto: this.formBuilder.group({
        id: [null],
        descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(75)]],
        referencia: [''],
        precoVenda: [null],
        precoCompra: [null],
        data_validade: [null],
        grupo: [null],
        subGrupo: [null],
        ativo: [true],
        ncm: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
      }),
      codBarra: this.formBuilder.group({
        id: [null],
        codBarra: ['', [Validators.minLength(7), Validators.maxLength(13)]],
        produto: [null],
        ativo: [true],
        fator: [1],
        unidade: ['UND', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
        favorito: [true]
      })

    })
    //quando o formulario inicializa, chama novamente o metodo
    this.onChanges();

  }

  onChanges(): void {
    this.produtoForm.get('produto.grupo').valueChanges
      .pipe(
        tap(grupo => console.log('Novo grupo: ', grupo)),
        switchMap(id => this.grupos.pipe(
          map(grupo => grupo.filter(grupo => grupo.id === id)),
          map(grupos => grupos && grupos.length > 0 ? grupos[0].id : 0),
          //map(grupo => grupo[0].id),
          switchMap(id => this.getSubGrupos(id).pipe(
            map((subGrupos: SubGrupo[]) => this.subGrupos = subGrupos)
          )), tap(console.log)

        )),
      ).subscribe(

      );
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
          //this.produto = response;
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
          //this.produto = response;
          // this.produto = response;
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
        grupo: produto.subGrupo.grupo.id,
        subGrupo: produto.subGrupo
      },
      codBarra: {
        id: codBarraFavorito[0].id,
        codBarra: codBarraFavorito[0].codBarra,
        produto: codBarraFavorito[0].produto,
        ativo: codBarraFavorito[0].ativo,
        fator: codBarraFavorito[0].fator,
        unidade: codBarraFavorito[0].unidade,
        favorito: codBarraFavorito[0].favorito

      }

    })
    console.log('forumlario inicializado')
    console.log(this.produtoForm.value)
  }


  cancel(): void {
    this.router.navigate(['/produtos'])

  }

  resetForm() {
    this.produtoForm.reset();
    this.initForm();
    this.produto = new Produto(); //se fosse interface: <Produto>{};
    this.codBarras = [];
    //this.subGrupos = [];
    //this.router.navigate(['/produtos/new'])

  }

  findById(id) {
    if (id) {

      this.produto.id = id;
      this.produtoService.findById(id).subscribe(dados => {
        //this.produto = dados; //se fosse interface: <Produto>{};
        this.codBarras = [];
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

}
