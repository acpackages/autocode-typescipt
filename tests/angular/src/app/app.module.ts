import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AcNgMultiRouterModule } from '@autocode-ts/ac-angular';



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
    AcNgMultiRouterModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes,{useHash:true})
  ],

  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap:[AppComponent],
   providers: [
    provideHttpClient(),
  ]
})
export class AppModule { }
