import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { Router } from "@angular/router";
import { CompetenciaI } from "../../../../models/competenciaComp.interface";

@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.css']
})
export class CompetenciasComponent implements OnInit {

  constructor(private apiService: ApiService, private router:Router) {}
  title = "Angular Grid Card View";
  gridColumns = 3;

  competencias!: CompetenciaI[];

  
  ngOnInit () : void {
    this.getData();
  }
  getData() {
    this.apiService.getAllCompetencias().subscribe(data =>{
      this.competencias = data;
      console.log(this.competencias);
    })
  }

  visualizarCompetencia(id: Number){
    console.log(id);
    this.router.navigate(['admin/visualizarcompetencia',id])
  }

  nuevaCompetencia() {
    this.router.navigate(['admin/crearcompetencia'])
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
