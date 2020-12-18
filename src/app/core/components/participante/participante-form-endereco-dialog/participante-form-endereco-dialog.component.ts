import { Endereco } from './../../../model/Endereco.model';
import { Cep } from './../../../../shared/model/cep';
import { ConsultaCepService } from './../../../../shared/services/consulta-cep.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-participante-form-endereco-dialog',
  templateUrl: './participante-form-endereco-dialog.component.html',
  styleUrls: ['./participante-form-endereco-dialog.component.css']
})
export class ParticipanteFormEnderecoDialogComponent implements OnInit {

  // public enderecoForm: FormGroup;
  private cepModel: Cep;
  //public endereco: Endereco;


  constructor(
    public dialogRef: MatDialogRef<ParticipanteFormEnderecoDialogComponent>,
    private cepService: ConsultaCepService,
    @Inject(MAT_DIALOG_DATA) public endereco: Endereco

  ) { }

  ngOnInit(): void {


  }

  cancel(): void {
    this.dialogRef.close();
  }


  consultaCEP(cep) {

    if (cep != null && cep !== '') {

      this.cepService.consultaCEP(cep).subscribe(response => {
        this.cepModel = response;

        if (this.cepModel.localidade != null) {

          this.endereco.logradouro = this.cepModel.logradouro;
          this.endereco.cidade = this.cepModel.localidade;
          this.endereco.uf = this.cepModel.uf;
          this.endereco.bairro = this.cepModel.bairro;

        } else {
          alert('CEP não encontrado, informe um CEP valido')
        }
      },
        erro => alert('Cep não encontrado!')
      );


    } else {
      //cep sem valor, limpa formulário.
      // this.limpa_formulario_cep();
      // this.enderecoForm.get('endereco').reset();
    }

  }
}
