import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PouchdbComponent } from './pouchdb/pouchdb.component';


const routes: Routes = [
  // {
  //   path:'',redirectTo:'/pouchdb',pathMatch:'full'
  // },
  {
    path:'', component: PouchdbComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
