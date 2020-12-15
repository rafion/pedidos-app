import { FormGroup } from '@angular/forms';
import { ConsultaCepService } from './../../../shared/services/consulta-cep.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participante-crud',
  templateUrl: './participante-crud.component.html',
  styleUrls: ['./participante-crud.component.css']
})
export class ParticipanteCrudComponent implements OnInit {

  formulario: FormGroup;


  constructor(private cepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados) {
    // this.formulario.setValue({});

    this.formulario.patchValue({
      endereco: {
        logradouro: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    this.formulario.get('nome').setValue('Rafion');

    // console.log(form);
  }
}
