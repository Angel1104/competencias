import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { CompetenciaEditI } from "../../../../models/competencia.interface";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CompetenciaI } from 'src/app/models/competenciaComp.interface';

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
  selector: 'app-crearcomp',
  templateUrl: './crearcomp.component.html',
  styleUrls: ['./crearcomp.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class CrearcompComponent {

  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService) {}
  
  dataCompetencia! : CompetenciaI;
  crearForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    descripcion : new FormControl('',Validators.required),
    encargado : new FormControl('',Validators.required),
    fechaFin : new FormControl('',Validators.required),
    fechaIni : new FormControl('',Validators.required),
    requisitos : new FormControl('',Validators.required),
    lugar : new FormControl('',Validators.required),
    id_tipoCompetencias : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    costo : new FormControl('',Validators.required),
  });

  crearCompetencia(datos:any){
    const fechaInicio = new Date(datos.fechaIni);
    const fechaFin = new Date(datos.fechaFin);

    const fechaInicioISO = fechaInicio.toISOString().split('T')[0];
    const fechaFinISO = fechaFin.toISOString().split('T')[0];
    const datosConFechasISO = {
    ...datos,
    fechaIni: fechaInicioISO,
    fechaFin: fechaFinISO
  };
    console.log(datosConFechasISO);
    Swal.fire({
      title: '¿Estás seguro de crear la competencia?',
      text: "No se podra deshacer la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.crear(datosConFechasISO);
        Swal.fire(
          'Creado!',
          'Se ha creado la competencia con éxito',
          'success'
        ).then(() => {
          this.router.navigate(['/admin/competencias']);
        });
      }
    });
    
  }
  crear(data:CompetenciaEditI){
    this.apiService.postCompetencia(data).subscribe(data=>{
      console.log(data);
    })
  }

}
