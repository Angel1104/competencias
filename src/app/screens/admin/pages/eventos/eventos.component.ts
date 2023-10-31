import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { Router } from "@angular/router";
import {  EventoI} from "../../../../models/eventoComp.interface";

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  constructor(private apiService: ApiService, private router:Router) {}
  title = "Angular Grid Card View";
  gridColumns = 3;

  eventos!: EventoI[];

  
  ngOnInit () : void {
    this.getData();
  }
  getData() {
    this.apiService.getAllEvents().subscribe(data =>{
      this.eventos = data;
      console.log(this.eventos);
    })
  }

  visualizarEvento(id: Number){
    console.log(id);
    this.router.navigate(['admin/visualizarevento',id])
  }

  nuevoEvento() {
    this.router.navigate(['admin/crearevento'])
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }
}
