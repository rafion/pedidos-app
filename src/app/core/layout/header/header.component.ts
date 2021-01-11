import { HeaderService } from './../../service/header.service';
import { NavigationEnd, Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
  }

  //acrescenta a classe css push-right a div id=sidebar para fechar e abrir sidebar
  isToggled(): boolean {
    const dom: Element = document.querySelector('.sidenav');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('.sidenav');
    dom.classList.toggle(this.pushRightClass);
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    this.router.navigate(['/login']);
  }


}
