import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { Router } from "@angular/router";
import {  EventoI} from "../../../../models/eventoComp.interface";
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvenComponent implements OnInit {
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
    this.router.navigate(['users/visualizarevento',id])
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  filterEvents() {
    // Aplicar filtro de estado
    this.applyEstadoFilter();
  
    // Aplicar filtro de búsqueda por nombre
    if (!this.searchTerm.trim()) {
      return;  // No hay término de búsqueda, no es necesario filtrar por nombre
    }
  
    this.filteredEventos = this.filteredEventos.filter(evento =>
      evento.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  applyEstadoFilter() {
    // Restablecer el filtro de búsqueda
    this.filteredEventos = [...this.eventos];
  
    // Aplicar filtro estático por estado si es diferente de 'Todos'
    if (this.estadoFiltro.toLowerCase() !== 'todos') {
      this.filteredEventos = this.filteredEventos.filter(evento =>
        evento.estado.toLowerCase() === this.estadoFiltro.toLowerCase()
      );
    }
  }

}
