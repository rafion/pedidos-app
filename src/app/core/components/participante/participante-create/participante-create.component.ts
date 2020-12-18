import { ParticipanteContatoDialogComponent } from './../participante-contato-dialog/participante-contato-dialog.component';
import { ParticipanteFormEnderecoDialogComponent } from './../participante-form-endereco-dialog/participante-form-endereco-dialog.component';
import { Contato } from './../../../model/Contato';
import { Endereco } from './../../../model/Endereco.model';
import { Cep } from './../../../../shared/model/cep';
import { Participante } from '../../../model/Participante.model';
import { ParticipanteService } from './../../../service/participante.service';
import { ConsultaCepService } from './../../../../shared/services/consulta-cep.service';
import { Router } from '@angular/router';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
//import { ThemePalette } from '@angular/material/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { MatDialog } from '@angular/material/dialog';

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

  cepModel = new Cep();
  participante: Participante = new Participante();
  endereco: Endereco = new Endereco();
  contato: Contato = new Contato();
  tipoContatos = ['Telefone', 'Email'];
  contatos: Contato[] = [];

  displayedColumnsContato = ['tipo', 'nome', 'telefone', 'email', 'favorito', 'action']
  displayedColumnsEndereco = ['logradouro', 'numero', 'bairro', 'tipo', 'cidade', 'uf', 'action']
  enderecos: Endereco[] = [];

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
    private formBuilder: FormBuilder,
    private cepService: ConsultaCepService,
    private participanteService: ParticipanteService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.participanteForm = this.formBuilder.group({
      participante: this.formBuilder.group({
        nome: ['', [Validators.required]],
        nomeFantasia: [null],
        cpf: [null],
        dataNascimento: [null],
        cnpj: [null],
        inscricaoEstadual: [null],
      }),
      // endereco: this.formBuilder.array([]),
      //contacts: this.formBuilder.array([]),
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




  /*
  {
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
    //console.log(this.participanteForm.value)
    this.participante = this.participanteForm.value.participante;
    this.contatos.push(this.participanteForm.value.contato);
    this.enderecos.push(this.participanteForm.value.endereco)

    this.participante.contatos = this.contatos;
    this.participante.enderecos = this.enderecos;

    console.log('objeto formulario:')
    console.log(this.participante);
    console.log(this.contatos);
    console.log(this.enderecos);
    console.log(this.participante);
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

  limparFom() {
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


  adcionarEnderecoLista(): void {
    const dialogRef = this.dialog.open(ParticipanteFormEnderecoDialogComponent, {
      minWidth: '500px',

      data: {
        id: this.endereco.id,
        tipo: this.endereco.tipo,
        cep: this.endereco.cep,
        cidade: this.endereco.cidade,
        uf: this.endereco.uf,
        bairro: this.endereco.bairro,
        logradouro: this.endereco.logradouro,
        numero: this.endereco.numero,
        complemento: this.endereco.complemento
      }


    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.endereco = result;
        this.enderecos.push(this.endereco);
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
        email: this.contato.email

      }


    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.contato = result;
        this.contatos.push(this.contato);
        //this.participanteForm.get('endereco').reset();
        //refresh na tabela
        this.contatos = Array.from(this.contatos);
        this.contato = new Contato();
      }

    });

  }

}
