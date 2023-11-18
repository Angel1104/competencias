import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { Router } from "@angular/router";
import {  EventoI} from "../../../../models/eventoComp.interface";
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventosComponent {
  constructor(private apiService: ApiService, private router:Router, private cdr: ChangeDetectorRef) {}
  title = "Angular Grid Card View";
  gridColumns = 3;
  searchTerm: string = '';
  filteredEventos: EventoI[] = [];

  eventos!: EventoI[];

  VerEventosInactivos() {
    this.router.navigate(['admin/eventos-inactivos'])
  }

  VerEventosActivos() {
    this.router.navigate(['admin/eventos-activos'])
  }

  nuevoEvento() {
    this.router.navigate(['admin/crearevento'])
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  
  filterEvents() {
    if (!this.searchTerm.trim()) {
      this.filteredEventos = [...this.eventos];
    } else {
      this.filteredEventos = this.eventos.filter(evento =>
        evento.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
