import { EnderecoService } from './../../../service/endereco.service';
import { ContatoService } from './../../../service/contato.service';
import { HeaderService } from './../../../service/header.service';

import { empty, Observable } from 'rxjs';
import { Municipio } from './../../../../shared/model/Municipio.model';
import { Estado } from './../../../../shared/model/Estado.model';
import { DadosService } from './../../../../shared/services/dados.service';
import { ParticipanteContatoDialogComponent } from './../participante-contato-dialog/participante-contato-dialog.component';
import { ParticipanteEnderecoDialogComponent } from './../participante-endereco-dialog/participante-endereco-dialog.component';
import { Contato } from '../../../model/Contato.model';
import { Endereco } from './../../../model/Endereco.model';
import { Cep } from './../../../../shared/model/cep';
import { Participante } from '../../../model/Participante.model';
import { ParticipanteService } from './../../../service/participante.service';
import { ConsultaCepService } from './../../../../shared/services/consulta-cep.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
//import { ThemePalette } from '@angular/material/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { MatDialog } from '@angular/material/dialog';
import { tap, map, switchMap } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import Swal from 'sweetalert2';

/*https://github.com/mariohmol/js-brasil
https://github.com/mariohmol/ng-brazil
*/

@Component({
  selector: 'app-participante-create',
  templateUrl: './participante-create.component.html',
  styleUrls: ['./participante-create.component.css']
})
export class ParticipanteCreateComponent implements OnInit {

  myModel: any;
  public MASKS = MASKS;
  cepModel = new Cep();
  participante: Participante = new Participante();
  endereco: Endereco = new Endereco();
  enderecos: Endereco[] = [];
  contato: Contato = new Contato();
  contatos: Contato[] = [];
  estados: Estado[];
  //estados: Observable<Estado[]>;
  municipios: Municipio[];
  displayedColumnsContato = ['tipo', 'nome', 'telefone', 'email', 'favorito', 'action']
  displayedColumnsEndereco = ['tipo', 'logradouro', 'numero', 'bairro', 'cidade', 'uf', 'favorito', 'action']
  radioPessoa: 'F' | 'J' = 'F'; //= "F";
  pessoas: any; // string[]; //= ["P. Fisica", "P. Juridica"];
  success: boolean = false;
  errors: String[];
  participanteForm: FormGroup;
  checkboxCliente = true;
  checkboxFornecedor = false;
  checkboxFuncionario = false;
  checkboxAdmin = false;

  constructor(
    private router: Router,
    private activetedRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cepService: ConsultaCepService,
    private participanteService: ParticipanteService,
    private dialog: MatDialog,
    private dadosService: DadosService,
    private headerService: HeaderService,
    private contatoService: ContatoService,
    private enderecoService: EnderecoService
  ) {
    headerService.headerData = {
      title: this.activetedRouter.snapshot.paramMap.get('id') ? 'Clientes/Editar' : 'Clientes/Novo Cliente',
      icon: 'people',
      routerUrl: '/participantes'
    }
  }

  ngOnInit(): void {

    //this.estados = this.dadosService.getEstados();
    // foi criado uma forma melhor com o pipe async
    this.dadosService.getEstados()
      .subscribe(dados => { this.estados = dados }); //{ this.estados = dados; console.log(dados); });

    this.initForm();

    this.pessoas = this.getPessoa();

    this.participanteForm.get('endereco.uf').valueChanges
      .pipe(
        tap(estado => console.log('Novo estado: ', estado)),
        map(uf => this.estados.filter(e => e.uf === uf)),
        map(estados => estados && estados.length > 0 ? estados[0].codigo_uf : empty()),
        switchMap((codigo_uf: number) => this.dadosService.getMunicipios(codigo_uf)),
        tap(console.log)
      )
      .subscribe(municipios => this.municipios = municipios);

    //pega o id da rota
    const id = +this.activetedRouter.snapshot.paramMap.get('id')
    if (id) { this.findById(id); }

  }

  findById(id) {
    if (id) {
      this.participante.id = id;
      this.participanteService.readById(id).subscribe(dados => {
        this.updateForm(dados),
          console.log('dados do update form'),
          console.log(dados)
      }
        , errorResponse => {
          if (errorResponse.status == 404) {
            this.participanteService.showMessage('Cliente não encontrado!', true)
            this.resetForm();
            console.log('Participante não encontrado!');
          }
          this.participante = new Participante();

        }
      );
    }
  }
  /*
    createContatosFormGroup(): FormGroup {
      return this.formBuilder.group({
        id: [null],
        tipo: [null],
        nome: [null],
        telefone: [null],
        email: [null],
        favorio: [false]
      })
    }
  
    createEnderecosFormGroup(): FormGroup {
      return this.formBuilder.group({
        id: [null],
        cep: [null],
        tipo: [null],
        logradouro: [null],
        bairro: [null],
        numero: [null],
        complemento: [null],
        cidade: [null],
        uf: [null],
      })
    }
  
    */
  ////adcionarContato() {
  //   this.contacts = this.participanteForm.get('contato') as FormArray;
  // this.contacts.push(this.createContatosFormGroup());


  // }
  initForm() {
    this.participanteForm = this.formBuilder.group({
      //https://github.com/mariohmol/ng-brazil 
      participante: this.formBuilder.group({
        id: [null],
        nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(55)]],
        nomeFantasia: [null],
        cpf: [null, [<any>NgBrazilValidators.cpf]],
        dataNascimento: [null],
        cnpj: [null, [<any>NgBrazilValidators.cnpj]],
        inscricaoEstadual: [null],
      }),

      endereco: this.formBuilder.group({
        id: [null],
        cep: [null,],
        tipo: ['RESIDENCIAL'],
        logradouro: [null],
        bairro: [null],
        numero: [null],
        complemento: [null],
        municipio: [null],
        codigo_ibge: [null],
        uf: [null],
        favorito: [true],
        participante: [null]
      }),
      contato: this.formBuilder.group({
        id: [null],
        tipo: ['PESSOAL'],
        nome: [null, Validators.required],
        telefone: [null, <any>NgBrazilValidators.telefone],
        email: [null, Validators.email],
        favorito: [true],
        participante: [null]
      })
    })
  }

  onSubmit() {

    if (this.participanteForm.valid) {
      //transferir form para as classes
      this.participante = this.participanteForm.value.participante;
      this.contatos.push(this.participanteForm.value.contato);
      this.enderecos.push(this.participanteForm.value.endereco)

      this.participante.contatos = this.contatos;
      this.participante.enderecos = this.enderecos;

      //atualiza tabelas
      this.contatos = Array.from(this.contatos);
      this.enderecos = Array.from(this.enderecos);

      //console.log('objeto formulario que sera enviado:')
      // console.log(this.participante);
      //console.log(this.participante.enderecos);
      // console.log(this.participanteForm.value);
      if (this.participante.id) {
        console.log('participante com id ha enviar');
        console.log(this.participante);
        this.participanteService.update(this.participante).subscribe(response => {
          this.success = true;
          this.participante = response;
          this.updateForm(response);
          this.participanteService.showMessage('Participante Atualizado Com sucesso!!', false);

          //apaga o ultimo que sempre é o do formulario, que ja esta no array
          //this.contatos.pop();
          //this.enderecos.pop();

        }, errorResponse => {
          //this.participanteService.showMessage('Erro ao atualizar Participante', true);
          this.contatos.pop();
          this.enderecos.pop();
          this.contatos = Array.from(this.contatos);
          this.enderecos = Array.from(this.enderecos);
          this.success = false;
          this.errors = errorResponse.error.message;
          this.participanteService.showMessage(errorResponse.error.message, true)
        }
        )

      } else {
        console.log('novo participante ha enviar');
        console.log(this.participante);
        this.participanteService.create(this.participante).subscribe(response => {
          this.success = true;
          this.participante = response;
          this.participanteService.showMessage('Participante Salvo Com sucesso!!', false);
          this.updateForm(response);
          // console.log('response ao salvar:');
          // console.log(response);
          //console.log('objeto participante carregado do response:');
          //console.log(this.participante);
          //this.participante = new Participante;
          // this.router.navigate(['/participantes'])

        }, errorResponse => {
          //remove o ultimo adicionado no array, o ultimo é o do formulario principal
          this.contatos.pop();
          this.enderecos.pop();
          this.contatos = Array.from(this.contatos);
          this.enderecos = Array.from(this.enderecos);
          //remove o primeiro
          //this.contatos.shift;
          //this.enderecos.shift;

          this.success = false;
          this.errors = errorResponse.error.message;
          this.participanteService.showMessage(errorResponse.error.message, true)
          //console.log(errorResponse.error.message) //acessando a magen de erro da api
        }
        )
      }

    } else {
      this.participanteService.showMessage('Preencha corretamente o formulario!', true)
    }

  }

  updateForm(participante: Participante) {

    //this.resetForm();
    console.log('dados retornados por id');
    console.log(participante);
    // this.participante = participante;

    this.participante.id = participante.id;
    this.participante.nome = participante.nome;
    this.participante.nomeFantasia = participante.nomeFantasia;
    this.participante.cpf = participante.cpf;
    this.participante.dataNascimento = participante.dataNascimento;
    this.participante.cnpj = participante.cnpj;
    this.participante.inscricaoEstadual = participante.inscricaoEstadual;

    this.participante.enderecos = participante.enderecos;
    this.participante.contatos = participante.contatos;
    //atualiza tabela de contatos e enderecos
    this.contatos = Array.from(participante.contatos.filter(e => e.favorito == false));
    this.enderecos = Array.from(participante.enderecos.filter(e => e.favorito == false));
    //console.log('participante para update')
    //console.log(this.participante)

    let enderecoFavorito: Endereco[] = participante.enderecos.filter(e => e.favorito == true);
    let contatoFavorito: Contato[] = participante.contatos.filter(e => e.favorito == true);

    this.participanteForm.patchValue({
      participante: {
        id: participante.id,
        nome: participante.nome,
        nomeFantasia: participante.nomeFantasia,
        cpf: participante.cpf,
        dataNascimento: participante.dataNascimento,
        cnpj: participante.cnpj,
        inscricaoEstadual: participante.inscricaoEstadual,
      },
      endereco: {

        id: enderecoFavorito[0].id,
        cep: enderecoFavorito[0].cep,
        tipo: enderecoFavorito[0].tipo,
        logradouro: enderecoFavorito[0].logradouro,
        bairro: enderecoFavorito[0].bairro,
        numero: enderecoFavorito[0].numero,
        complemento: enderecoFavorito[0].complemento,
        municipio: enderecoFavorito[0].municipio,
        codigo_ibge: enderecoFavorito[0].codigo_ibge,
        uf: enderecoFavorito[0].uf,
        favorito: enderecoFavorito[0].favorito,
        participante: enderecoFavorito[0].participante

      },
      contato: {

        id: contatoFavorito[0].id,
        tipo: contatoFavorito[0].tipo,
        nome: contatoFavorito[0].nome,
        telefone: contatoFavorito[0].telefone,
        email: contatoFavorito[0].email,
        favorito: contatoFavorito[0].favorito,
        participante: contatoFavorito[0].participante

      }


    })
  }


  /*
    createParticipante(): void {
      this.participanteService.create(this.participanteForm.value).subscribe(response => {
        this.success = true;
        this.participanteService.showMessage('Participante criado!', false);
        this.participante = new Participante;
        this.router.navigate(['/participantes'])
        console.log(response);
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.message;
        this.participanteService.showMessage(errorResponse.error.message, true)
        //console.log(errorResponse.error.message) //acessando a magen de erro da api
      }
      )
  
      console.log(this.participanteForm.value)
  
    }
  */

  cancel(): void {
    this.router.navigate(['/participantes'])
    // this.participanteForm.reset();
    // this.initForm();
  }

  resetForm() {
    this.participanteForm.reset;
    this.initForm();
    this.participante = new Participante();
    this.enderecos = [];
    this.contatos = [];
    this.router.navigate(['/participantes/new'])

  }

  consultaCEP(cep) {

    if (cep != null && cep !== '') {

      this.cepService.consultaCEP(cep).subscribe(response => {
        this.cepModel = response;
        // console.log(response);
        if (this.cepModel.localidade != null) {

          //dessa forma preenche o formulario mas não passa o value para ele.
          // (<HTMLInputElement>document.getElementById("logradouro")).value = (this.cepModel.logradouro);
          //(<HTMLInputElement>document.getElementById("cidade")).value = this.cepModel.localidade;
          // (<HTMLInputElement>document.getElementById("estado")).value = this.cepModel.uf;
          //(<HTMLInputElement>document.getElementById("bairro")).value = this.cepModel.bairro;

          //preenche o formulario e passao o value
          this.participanteForm.get('endereco.logradouro').setValue(this.cepModel.logradouro);
          this.participanteForm.get('endereco.municipio').setValue(this.cepModel.localidade);
          this.participanteForm.get('endereco.codigo_ibge').setValue(this.cepModel.ibge);
          this.participanteForm.get('endereco.uf').setValue(this.cepModel.uf);
          this.participanteForm.get('endereco.bairro').setValue(this.cepModel.bairro);

        } else {
          alert('CEP não encontrado, informe um CEP valido')
        }
      },
        erro => alert('Cep não encontrado!')
      );

    } else {
      //cep sem valor, limpa formulário.
      // this.limpa_formulario_cep();
      this.participanteForm.get('endereco').reset();
    }

  }

  updateCodigoIbge(codigo_ibge) {
    this.participanteForm.get('endereco.codigo_ibge').setValue(codigo_ibge);

  }
  /*
    limpa_formulario_cep() {
      //Limpa valores do formulário de cep.
      (<HTMLInputElement>document.getElementById("logradouro")).value = '';
      (<HTMLInputElement>document.getElementById("bairro")).value = '';
      (<HTMLInputElement>document.getElementById("cidade")).value = '';
      (<HTMLInputElement>document.getElementById("uf")).value = '';
      (<HTMLInputElement>document.getElementById("ibge")).value = '';
  
    }
  */

  getPessoa() {
    return [
      { valor: 'F', desc: 'P. Fisica' },
      { valor: 'J', desc: 'P. Juridica' }
    ]
  }




  mask: string = '00.000.0000-00';
  cpf_cnpj: string;


  isCPF(): boolean {
    return this.cpf_cnpj == null ? true : this.cpf_cnpj.length < 12 ? true : false;
  }

  getCpfCnpjMask(): string {
    return this.isCPF() ? '000.000.000-009' : '00.000.000/0000-00';
  }

  favoritarContato(contato: Contato) {
    // this.service.favourite(contato).subscribe(response => {
    // contato.favorito = !contato.favorito;
    // })
    console.log("contato favoritado!");

  }

  newContato(contato: Contato) {
    console.log("formulario contato novo")
  }

  addContato(contato: Contato) {
    console.log("contato adcionado")
    console.log(contato)
    this.contatos.push(contato);
    console.log(this.contatos);
    console.log('tamanho do arry contatos: ')
    console.log(this.contatos.length);
    this.participanteForm.get('contato').reset();
    //refresh na tabela
    this.contatos = Array.from(this.contatos);
  }

  deleteContato(contato: Contato) {
    console.log("conato Delete!")
    if (contato.id) {
      // let r = confirm("Confirma a Exclusão do Contato!?\nSim ou Cancel.");
      Swal.fire({
        title: 'Confirmar a Exclusão?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Foi sem querer',
        confirmButtonColor: '#3f51b5',
        cancelButtonColor: '#f44336',

      }).then(result => {
        if (result.value) {
          this.contatoService.deleteById(contato.id).subscribe(() => {
            let posicao = this.contatos.indexOf(contato);
            this.contatos.splice(posicao, 1);
            this.contatos = Array.from(this.contatos);
            // this.contatoService.showMessage("Contato Excluido com sucesso");
            Swal.fire('Contato excluido com sucesso', 'O registro ja era', 'success')
          }, errorResponse => {
            // this.contatoService.showMessage(errorResponse.error.message, true)
            Swal.fire('Erro ao excluir registro', errorResponse.error.message, 'error')
          }
          )
        }
      })



    } else {
      let posicao = this.contatos.indexOf(contato);
      this.contatos.splice(posicao, 1);
      this.contatos = Array.from(this.contatos);
    }


  }

  newEndereco(endereco: Endereco) {
    console.log('novo endereco, limpar formularios endereco')
    this.participanteForm.get('endereco').reset();

  }
  favoritarEndereco(endecco: Endereco) {
    console.log('Endereco favoritado')
  }

  addEndereco(endereco: Endereco) {
    console.log('Endereco adcionado')
    console.log(endereco)

    this.enderecos.push(endereco);
    console.log(this.enderecos);
    console.log('tamanho do arry enderecos: ')
    console.log(this.enderecos.length);

    this.participanteForm.get('endereco').reset();
    //refresh na tabela
    this.enderecos = Array.from(this.enderecos);
  }




  deleteEndereco(endereco: Endereco) {
    console.log("Endereco Delete!")
    if (endereco.id) {
      // let r = confirm("Confirma a Exclusão do Endereço!?\nSim ou Cancel.");
      Swal.fire({
        title: 'Confirmar a Exclusão?',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Foi sem querer',
        confirmButtonColor: '#3f51b5',
        cancelButtonColor: '#f44336',

      }).then(result => {
        if (result.value) {
          this.enderecoService.deleteById(endereco.id).subscribe(() => {
            let posicao = this.enderecos.indexOf(endereco);
            this.enderecos.splice(posicao, 1);
            this.enderecos = Array.from(this.enderecos);
            //this.enderecoService.showMessage("Contato Excluido com sucesso");
            Swal.fire('Endereço excluido com sucesso', 'O registro ja era', 'success')
          }, errorResponse => {
            this.enderecoService.showMessage(errorResponse.error.message, true)
          }

          )
        }
      })
    } else {
      let posicao = this.enderecos.indexOf(endereco);
      this.enderecos.splice(posicao, 1);
      this.enderecos = Array.from(this.enderecos);
    }
  }

  adcionarEnderecoLista(): void {
    const dialogRef = this.dialog.open(ParticipanteEnderecoDialogComponent, {
      minWidth: '500px',

      data: {
        id: this.endereco.id,
        tipo: this.endereco.tipo,
        cep: this.endereco.cep,
        codigo_ibge: this.endereco.codigo_ibge,
        municipio: this.endereco.municipio,
        uf: this.endereco.uf,
        bairro: this.endereco.bairro,
        logradouro: this.endereco.logradouro,
        numero: this.endereco.numero,
        complemento: this.endereco.complemento,
        // participante: this.participante.id
      }

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.endereco = result;
        if (this.participante.id) {
          this.endereco.participante = this.participante.id;
        }
        this.enderecos.push(this.endereco);
        console.log('endereco adcionado');
        console.log(this.endereco);
        //this.participanteForm.get('endereco').reset();
        //refresh na tabela
        this.enderecos = Array.from(this.enderecos);
        this.endereco = new Endereco();
      }

    });

  }

  adcionarContatoLista(): void {
    const dialogRef = this.dialog.open(ParticipanteContatoDialogComponent, {
      minWidth: '500px',

      data: {
        id: this.contato.id,
        tipo: this.contato.tipo,
        nome: this.contato.nome,
        telefone: this.contato.telefone,
        email: this.contato.email,
        // participante: this.participante.id

      }

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.contato = result;
        if (this.participante.id) {
          this.contato.participante = this.participante.id;
        }
        this.contatos.push(this.contato);
        console.log('endereco adcionado');
        console.log(this.contato);
        //this.participanteForm.get('endereco').reset();
        //refresh na tabela
        this.contatos = Array.from(this.contatos);
        this.contato = new Contato();
      }

    });

  }

  capitalize(value: any) {
    if (typeof value !== 'string') {
      return '';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }


  /* https://sweetalert2.github.io/*/
  alertInfo() {
    Swal.fire('oi, to de boa com alerta facil')
  }

  alertDelete() {
    Swal.fire({
      title: 'Confirmar a Exclusão?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Foi sem querer'

    }).then(result => {
      if (result.value) {
        Swal.fire('Excluido com sucesso', 'O registro ja era', 'success')
      }
    })
  }

  alertInput() {
    Swal.fire({
      title: 'informe um email',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Enviar'
    }).then(result => {
      Swal.fire(`${result.value} Enviado com sucesso`)
    })
  }


}
