import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent
  ],
  exports:[
    RouterModule,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes,{useHash:true})
  ],
  bootstrap:[AppComponent],
   providers: [
    provideHttpClient(),
  ]
})
export class AppModule { }
