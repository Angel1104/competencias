import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { CompetenciaI } from '../../../../models/competenciaComp.interface';
import { EventoI } from '../../../../models/eventoComp.interface';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as ApexCharts from 'apexcharts';
import { ApexOptions } from 'apexcharts';


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
  selector: 'app-reportes-eventos',
  templateUrl: './reportes-eventos.component.html',
  styleUrls: ['./reportes-eventos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class ReportesEventosComponent implements OnInit {
  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  searchTerm: string = '';
  filteredCompetencias: EventoI[] = [];
  competencias: EventoI[] = [];
  estadoFiltro: string = 'Activo';

  pickerStart: Date | null = null;
  pickerEnd: Date | null = null;

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.apiService.getAllEvents().subscribe((data) => {
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

  generarGraficoBarra(): void {
    const activos = this.competencias.filter(competencia => competencia.estado === 'Activo').length;
    const inactivos = this.competencias.filter(competencia => competencia.estado === 'Inactivo').length;

    const chartOptions: ApexOptions = {
      series: [{ data: [activos, inactivos] }],
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: ['Activos', 'Inactivos'],
      },
    };

    const chart = new ApexCharts(document.querySelector('#chartbar'), chartOptions);
    chart.render();
  }

  generarGraficoPie(): void {
    const activos = this.competencias.filter(competencia => competencia.estado === 'Activo').length;
    const inactivos = this.competencias.filter(competencia => competencia.estado === 'Inactivo').length;

    const chartOptions: ApexOptions = {
      series: [activos, inactivos],
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: ['Activos', 'Inactivos'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    const chart = new ApexCharts(document.querySelector('#chartpie'), chartOptions);
    chart.render();
  }
  
}
