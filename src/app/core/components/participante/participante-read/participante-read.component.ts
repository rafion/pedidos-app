import { HeaderService } from './../../../service/header.service';
import { ParticipanteDeleteDialogComponent } from './../participante-delete-dialog/participante-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ParticipanteService } from './../../../service/participante.service';

import { Participante } from './../../../model/Participante.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticipanteResumoDTO } from './participante-resumo.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BrowserStack } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-participante-read',
  templateUrl: './participante-read.component.html',
  styleUrls: ['./participante-read.component.css']
})
export class ParticipanteReadComponent implements OnInit {

  participantes: Participante[]; // = PARTICIPANTE;
  //participanteResumoDTO: ParticipanteResumoDTO[];
  participanteResumoDTO: MatTableDataSource<ParticipanteResumoDTO>;
  displayedColumns = ['id', 'nome', 'cidade', 'telefone', 'email', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  totalElements = 0;
  page = 0;
  size = 10;
  pageSizeOptions: number[] = [1, 5, 10, 20, 30];


  constructor(
    private participanteService: ParticipanteService,
    public dialog: MatDialog,
    private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Lista de Clientes',
      icon: 'people',
      routerUrl: '/participantes',
    }
  }

  ngOnInit(): void {
    //this.atualizaTabela();
    this.atualizaTabelaPageable(this.page, this.size)
    this.participanteResumoDTO.paginator = this.paginator;
    this.participanteResumoDTO.sort = this.sort;

  }
  ngAfterViewInit() {
    //this.participanteResumoDTO.paginator = this.paginator;
    // this.participanteResumoDTO.sort = this.sort;
  }
  /*
    atualizaTabela(): void {
      this.participanteService.readTable()
        .subscribe(participantes => {
          this.participanteResumoDTO = participantes
          //console.log(this.participantes)
        }, errorMessage => this.participanteService.errorHandler(errorMessage))
    }
    */

  atualizaTabelaPageable(page = 0, size = 10) {
    this.participanteService.readTablePageable(page, size)
      .subscribe(response => {

        this.participanteResumoDTO = new MatTableDataSource(response.content) //; response.content;
        this.totalElements = response.totalElements;
        this.page = response.number;
        //console.log(response.content);
        //console.log(response.content.length);
        if (response.content.length == 0) {
          this.participanteService.showMessage('Nenhum Cliente encontrado!', true);
        }
      }, errorResponse => {
        switch (errorResponse.status) {
          case 400: console.log(errorResponse.error.messagem);//bad request
            break;

          case 404: this.participanteService.showMessage('Nenhum Cliente encontrado!', true);
            break;

          default:
            console.log(errorResponse.error.messagem);
            this.participanteService.errorHandler(errorResponse);


        }


      }
      )
  }

  //PageEvent vem com propriedades
  paginar(event: PageEvent) {
    this.page = event.pageIndex;
    this.atualizaTabelaPageable(this.page, this.size)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.participanteResumoDTO.filter = filterValue.trim().toLowerCase();

    if (this.participanteResumoDTO.paginator) {
      this.participanteResumoDTO.paginator.firstPage();
    }
  }


  openDeleteDialog(participante) {
    const dialogRef = this.dialog.open(ParticipanteDeleteDialogComponent, {
      data: { id: participante.id, nome: participante.nome, municipio: participante.municipio, telefone: participante.telefone }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('id para deletar:' + participante.id);
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.deleteParticipante(participante.id);
      }
    });
  }

  deleteParticipante(id) {
    this.participanteService.deleteById(id).subscribe(() => {
      this.participanteService.showMessage("Cadastro excluido com sucesso");
      //this.contatos = Array.from(this.contatos);
      this.atualizaTabelaPageable();
    }, errorResponse => {
      this.participanteService.showMessage(errorResponse.error.message, true)
    })
  }

  /*
    deleteParticipante(event): void {
      if (window.confirm('Deseja Mesmo deleter o registro')) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
  
  */


}
