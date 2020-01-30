import { Component, OnInit } from '@angular/core';
import {PouchDBServiceService} from '../pouch-dbservice.service'

@Component({
  selector: 'app-pouchdb',
  templateUrl: './pouchdb.component.html',
  styleUrls: ['./pouchdb.component.css']
})
export class PouchdbComponent implements OnInit {

    pouchdbservice :PouchDBServiceService;

  constructor() { 
     
  }

  ngOnInit() {
  }

  syncData(){
    this.pouchdbservice
    .sync()
    .then();
  }
}
