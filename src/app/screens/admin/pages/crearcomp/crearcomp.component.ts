import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
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
  
  imagenSeleccionada: File | null = null;

  dataCompetencia! : CompetenciaI;

  crearFormC = new FormGroup({
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
    estado : new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required)
  });

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    
    if (file) {
      this.imagenSeleccionada = file;
    }
  }

  crearCompetencia(datos:any){
    const fechaInicio = new Date(datos.fechaIni);
    const fechaFin = new Date(datos.fechaFin);

    const fechaInicioISO = fechaInicio.toISOString().split('T')[0];
    const fechaFinISO = fechaFin.toISOString().split('T')[0];

    const formData = new FormData();
    formData.append('nombre', datos.nombre);
    formData.append('descripcion', datos.descripcion);
    formData.append('encargado', datos.encargado);
    formData.append('fechaIni', fechaInicioISO);
    formData.append('fechaFin', fechaFinISO);
    formData.append('requisitos', datos.requisitos);
    formData.append('lugar', datos.lugar);
    formData.append('id_tipoCompetencias', datos.id_tipoCompetencias.toString());
    formData.append('email', datos.email);
    formData.append('costo', datos.costo);
    formData.append('estado', datos.estado);
    formData.append('imagen', this.imagenSeleccionada as File);

    console.log(formData);
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
        this.crear(formData);
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
  crear(data:any){
    this.apiService.postCompetencia(data).subscribe(data=>{
      console.log(data);
    })
  }

}
