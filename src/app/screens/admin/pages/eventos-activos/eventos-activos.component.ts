import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { Router } from "@angular/router";
import {  EventoI} from "../../../../models/eventoComp.interface";
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-eventos-activos',
  templateUrl: './eventos-activos.component.html',
  styleUrls: ['./eventos-activos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventosActivosComponent implements OnInit {
  constructor(private apiService: ApiService, private router:Router, private cdr: ChangeDetectorRef) {}
  title = "Angular Grid Card View";
  gridColumns = 3;
  searchTerm: string = '';
  filteredEventos: EventoI[] = [];

  estadoFiltro: string = 'Activo';

  eventos!: EventoI[];

  ngOnInit () : void {
    this.getData();
  }
  getData() {
    this.apiService.getAllEvents().subscribe(data =>{
      this.eventos = data;
      this.filterEvents();
      this.cdr.detectChanges()
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

  
  filterEvents() {
    if (!this.searchTerm.trim()) {
      // Filtrar por nombre
      this.filteredEventos = this.eventos.filter(evento =>
        evento.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEventos = this.eventos;
    }
  
    // Aplicar filtro estático por estado
    this.filteredEventos = this.filteredEventos.filter(evento =>
      evento.estado.toLowerCase() === this.estadoFiltro.toLowerCase()
    );
  }

}
