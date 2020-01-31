import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PouchdbComponent } from './pouchdb/pouchdb.component'; 
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,// You need to import FOrms Module   for forms 
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
