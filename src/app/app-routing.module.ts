import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PouchdbComponent } from './pouchdb/pouchdb.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
