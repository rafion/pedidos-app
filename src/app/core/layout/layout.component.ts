import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @Input() isDarkTheme: boolean;

  constructor() { }

  ngOnInit(): void {
    //console.log('tema: ', localStorage.getItem('theme'));

  }

  /* getTheme() {
     if (localStorage.getItem('theme') == "Dark") {
       this.isDarkTheme = true;
       console.log("tema alterado:", this.isDarkTheme)
     }
   }
   */

  //recebe tema selecionado no header componet
  receberThema(darkThemeMode) {
    this.isDarkTheme = darkThemeMode
    console.log('Tema Dark: ', darkThemeMode)
  }
}
