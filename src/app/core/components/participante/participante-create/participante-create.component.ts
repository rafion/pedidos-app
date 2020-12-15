import { Contato } from './../../../model/Contato';
import { Endereco } from './../../../model/Endereco.model';
import { Cep } from './../../../../shared/model/cep';
import { Participante } from '../../../model/Participante.model';
import { ParticipanteService } from './../../../service/participante.service';
import { ConsultaCepService } from './../../../../shared/services/consulta-cep.service';
import { Router } from '@angular/router';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
//import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';

//https://github.com/mariohmol/js-brasil
//https://github.com/mariohmol/ng-brazil


@Component({
  selector: 'app-participante-create',
  templateUrl: './participante-create.component.html',
  styleUrls: ['./participante-create.component.css']
})
export class ParticipanteCreateComponent implements OnInit {

  myModel: any;

  //cepmask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public MASKS = MASKS;

  tipoContatos = ['Telefone', 'Email'];
  contatos: Contato[] = []; /* [
    { id: 1, tipo: 'PESSOAL', nome: 'Rafion', telefone: '79998063899', email: 'rafion.torres@gmail.com', favorito: false },
    { id: 2, tipo: 'COMERCIAL', nome: 'Rafion', telefone: '79998063899', email: 'rafion.torres@gmail.com', favorito: false },
    { id: 3, tipo: 'PESSOAL', nome: 'Rafion', telefone: '79998063899', email: 'rafion.torres@gmail.com', favorito: false }

  ]; */

  displayedColumnsContato = ['tipo', 'nome', 'telefone', 'email', 'favorito', 'action']

  displayedColumnsEndereco = ['logradouro', 'numero', 'bairro', 'tipo', 'cidade', 'uf', 'action']

  enderecos: Endereco[] = []; //= [
  // { id: 1, logradouro: 'Rua D', numero: '10', bairro: 'Centro', tipo: 'Residencial', cidade: 'Aracaju', uf: 'SE', favorito: false },
  //  { id: 2, logradouro: 'Rua F', numero: '10', bairro: 'Centro', tipo: 'Corporativo', cidade: 'Aracaju', uf: 'SE', favorito: false }
  // ];

  radioPessoa: 'F' | 'J' = 'F'; //= "F";
  pessoas: any; // string[]; //= ["P. Fisica", "P. Juridica"];

  success: boolean = false;
  errors: String[];

  participanteForm: FormGroup;

  //checkClienteControl: boolean = false;

  checkboxCliente = true;
  checkboxFornecedor = false;
  checkboxFuncionario = false;
  checkboxAdmin = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cepService: ConsultaCepService,
    private participanteService: ParticipanteService,

  ) { }

  ngOnInit(): void {
    /*instanciando formulario sem o form builder
  this.formulario = new FormGroup({
    nome: new FormControl(null),
    nomeFantasia: new FormControl(null),
    cpf: new FormControl(null),
    dataNascimento: new FormControl(null),
    cnpj: new FormControl(null),
    inscricaoEstadual: new FormControl(null),
    cep: new FormControl(null),
    logradouro: new FormControl(null),
    numero: new FormControl(null),
    complemento: new FormControl(null),
    cidade: new FormControl(null),
    uf: new FormControl(null), 
    
   
  }); */

    //com o formBuilder
    this.participanteForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      nomeFantasia: [null],
      cpf: [null],
      dataNascimento: [null],
      cnpj: [null],
      inscricaoEstadual: [null],

      endereco: this.formBuilder.group({
        id: [null],
        cep: [null],
        tipo: [null],
        logradouro: [null],
        bairro: [null],
        numero: [null],
        complemento: [null],
        cidade: [null],
        uf: [null],
      }),

      contato: this.formBuilder.group({
        id: [null],
        tipo: [null],
        nome: [null],
        telefone: [null],
        email: [null],
        favorio: [false]
      })

    })

    this.pessoas = this.getPessoa();

  }

  cepModel = new Cep();


  participante: Participante = {
    nome: '',
  };

  /*
  endereco: Endereco = {
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    ibge: '',
    ddd: '',
    numero: '',
    tipo: '',
    favorito: false
  };
*/





  onSubmit() {


    /*
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
        */

    console.log(this.participanteForm.value)


  }

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

  cancel(): void {
    this.router.navigate(['/participantes'])
    this.participanteForm.reset();
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
          this.participanteForm.get('endereco.cidade').setValue(this.cepModel.localidade);
          this.participanteForm.get('endereco.uf').setValue(this.cepModel.uf);
          this.participanteForm.get('endereco.bairro').setValue(this.cepModel.bairro);

          console.log('entrou no response');
        } else {
          alert('CEP não encontrado, informe um CEP valido')
        }
      },
        erro => alert('Cep não encontrado!')
      );
      //console.log(this.cepService.consultaCEP(cep))

    } else {
      //cep sem valor, limpa formulário.
      // this.limpa_formulario_cep();
      this.participanteForm.get('endereco').reset();
    }

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
    console.log("contato favotitado!");

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
    let posicao = this.contatos.indexOf(contato);
    this.contatos.splice(posicao, 1);
    this.contatos = Array.from(this.contatos);
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
    console.log('Endereco deletado')
    //this.enderecos.splice(index, 1); //remover

    //pega a possição no array
    let posicao = this.enderecos.indexOf(endereco);
    this.enderecos.splice(posicao, 1);

    //refresh na tabela
    this.enderecos = Array.from(this.enderecos);
  }




}
