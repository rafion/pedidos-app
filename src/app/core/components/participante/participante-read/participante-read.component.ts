import { ParticipanteService } from './../../../service/participante.service';
import { PARTICIPANTE } from './../participante.mock';
import { Participante } from './../../../model/Participante.model';
import { Component, OnInit } from '@angular/core';
import { ParticipanteResumoDTO } from './participante-resumo.model';

@Component({
  selector: 'app-participante-read',
  templateUrl: './participante-read.component.html',
  styleUrls: ['./participante-read.component.css']
})
export class ParticipanteReadComponent implements OnInit {

  participantes: Participante[]; // = PARTICIPANTE;
  participanteResumoDTO: ParticipanteResumoDTO[];
  displayedColumns = ['id', 'nome', 'cidade', 'telefone', 'action'];


  constructor(private participanteService: ParticipanteService) { }

  ngOnInit(): void {
    this.participanteService.readTable().subscribe(participantes => {
      this.participanteResumoDTO = participantes
      //console.log(this.participantes)
    })

  }



}
