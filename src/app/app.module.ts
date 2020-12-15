import { CoreModule } from './core/core.module';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent


  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
