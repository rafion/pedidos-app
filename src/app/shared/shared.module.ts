import { DadosService } from './services/dados.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamelCasePipe } from './pipes/camel-case.pipe';



@NgModule({
  declarations: [CamelCasePipe],
  imports: [
    CommonModule
  ],
  providers: [DadosService]
})
export class SharedModule { }
