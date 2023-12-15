import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { CompetenciaI } from '../../../../models/competenciaComp.interface';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class ReportesComponent implements OnInit {
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  searchTerm: string = '';
  filteredCompetencias: CompetenciaI[] = [];
  competencias: CompetenciaI[] = [];
  estadoFiltro: string = 'Activo';

  pickerStart: Date | null = null;
  pickerEnd: Date | null = null;

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.apiService.getAllCompetencias().subscribe((data) => {
      this.competencias = data;
      this.applyFilters(); // Aplicar filtros una vez que los datos estén disponibles
      this.cdr.detectChanges();
      console.log(this.competencias);
    });
  }

  applyFilters(): void {
    this.filteredCompetencias = this.competencias.filter((competencia) => {
      const estadoCondition = this.estadoFiltro.toLowerCase() === 'todos' || competencia.estado.toLowerCase() === this.estadoFiltro.toLowerCase();
      const searchTermCondition = this.searchTerm.trim() === '' || competencia.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      const startDateCondition = !this.pickerStart || new Date(competencia.fechaIni) >= this.pickerStart;
      const endDateCondition = !this.pickerEnd || new Date(competencia.fechaFin) <= this.pickerEnd;
  
      return estadoCondition && searchTermCondition && startDateCondition && endDateCondition;
    });
  }
  
  applyEstadoFilter(): void {
    this.applyFilters();
  }
  
  filteredCompetens(): void {
    this.applyFilters();
  }

  onStartDateSelected(date: Date): void {
    this.pickerStart = date;
    this.applyFilters();
  }
  
  onEndDateSelected(date: Date): void {
    this.pickerEnd = date;
    this.applyFilters();
  }

  getTipo(idTipo: string): string {
    const tipo = parseInt(idTipo, 10); // Convertir a número
    return tipo === 2 ? 'Grupal' : tipo === 1 ? 'Individual' : 'Otro';
  }
  
  
}
