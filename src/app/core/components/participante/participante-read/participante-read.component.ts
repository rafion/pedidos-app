import { ParticipanteService } from './../../../service/participante.service';
import { PARTICIPANTE } from './../participante.mock';
import { Participante } from './../../../model/Participante.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participante-read',
  templateUrl: './participante-read.component.html',
  styleUrls: ['./participante-read.component.css']
})
export class ParticipanteReadComponent implements OnInit {

  participantes: Participante[]; // = PARTICIPANTE;
  displayedColumns = ['id', 'nome', 'contato', 'action'];


  constructor(private participanteService: ParticipanteService) { }

  ngOnInit(): void {
    this.participanteService.read().subscribe(participantes => {
      this.participantes = participantes
    })

  }



}
