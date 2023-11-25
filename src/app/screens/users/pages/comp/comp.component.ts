import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { Router } from "@angular/router";
import { CompetenciaI } from "../../../../models/competenciaComp.interface";
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-comp',
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompComponent  implements OnInit {

  constructor(private apiService: ApiService, private router:Router, private cdr: ChangeDetectorRef) {}
  title = "Angular Grid Card View";
  gridColumns = 3;
  searchTerm: string = '';
  filteredCompetencias: CompetenciaI[] = [];

  competencias!: CompetenciaI[];
  estadoFiltro: string = 'Activo';

  
  ngOnInit () : void {
    this.getData();
  }
  getData() {
    this.apiService.getAllCompetencias().subscribe(data =>{
      this.competencias = data;
      this.filteredCompetens();
      this.cdr.detectChanges();
      console.log(this.competencias);
    })
  }

  visualizarCompetencia(id: Number){
    console.log(id);
    this.router.navigate(['users/visualizarcompetencia',id])
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  filteredCompetens() {
    // Aplicar filtro de estado
    this.applyEstadoFilter();
  
    // Aplicar filtro de búsqueda por nombre
    if (!this.searchTerm.trim()) {
      return;  // No hay término de búsqueda, no es necesario filtrar por nombre
    }
  
    this.filteredCompetencias = this.filteredCompetencias.filter(competencia =>
      competencia.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  applyEstadoFilter() {
    // Restablecer el filtro de búsqueda
    this.filteredCompetencias = [...this.competencias];
  
    // Aplicar filtro estático por estado si es diferente de 'Todos'
    if (this.estadoFiltro.toLowerCase() !== 'todos') {
      this.filteredCompetencias = this.filteredCompetencias.filter(competencia =>
        competencia.estado.toLowerCase() === this.estadoFiltro.toLowerCase()
      );
    }
  }
}