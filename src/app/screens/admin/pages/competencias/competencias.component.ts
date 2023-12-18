import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { Router } from "@angular/router";
import { CompetenciaI } from "../../../../models/competenciaComp.interface";
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetenciasComponent implements OnInit {

  @ViewChild('pdf', { static: false }) pdfContent!: ElementRef;


  constructor(private apiService: ApiService, 
    private router:Router, 
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

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
    this.router.navigate(['admin/visualizarcompetencia',id])
  }

  notificarCompetencia(id:Number){
    this.router.navigate(['/admin/reportcomp',id]);
  }

  nuevaCompetencia() {
    this.router.navigate(['admin/crearcompetencia'])
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

  agregarGanador(id:Number, tipo:Number){
    if (tipo == 1) {
      this.router.navigate(['/admin/ganadorIndividual',id]);
    } else {
      this.router.navigate(['/admin/ganadorGrpal',id]);
    }
  }

  generarPDF(): void {
    const pdf = new jsPDF('p', 'px', 'a4');
    const content: HTMLElement = this.pdfContent.nativeElement;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('documento.pdf');
    });
  }

}
