import { HeaderService } from './../../service/header.service';
import { NavigationEnd, Router } from '@angular/router';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //emite evento que pode ser capturado no component pai
  @Output() darkThemeEmitter = new EventEmitter();

  isDarkTheme: boolean = false;

  public pushRightClass: string;

  constructor(private router: Router, private headerService: HeaderService) {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
  }

  get title(): string {
    return this.headerService.headerData.title
  }
  get icon(): string {
    return this.headerService.headerData.icon
  }
  get routerUrl(): string {
    return this.headerService.headerData.routerUrl
  }

  ngOnInit(): void {
    this.pushRightClass = 'push-right';
    this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;



  }

  //acrescenta a classe css push-right a div id=sidebar para fechar e abrir sidebar
  isToggled(): boolean {
    const dom: Element = document.querySelector('.sidenav');
    return dom.classList.contains(this.pushRightClass);
  }

  storeThemeSelection() {
    localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
    //emite evento que pode ser capturado no component pai, nesse caso o layout component
    this.darkThemeEmitter.emit(this.isDarkTheme);
  }

  darkThemeMode(): void {
    this.darkThemeEmitter.emit(this.isDarkTheme);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('.sidenav');
    dom.classList.toggle(this.pushRightClass);
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
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
      cancelButtonText: 'Foi sem querer',
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f44336',

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
      confirmButtonText: 'Enviar',
      confirmButtonColor: '#3f51b5',
      cancelButtonColor: '#f44336',
    }).then(result => {

      Swal.fire(`${result.value} Enviado com sucesso`)
    })
  }

}
