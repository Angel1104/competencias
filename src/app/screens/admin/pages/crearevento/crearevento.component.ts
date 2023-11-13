import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { EventoEditI } from "../../../../models/evento.interface";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { EventoI } from 'src/app/models/eventoComp.interface';

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
  selector: 'app-crearevento',
  templateUrl: './crearevento.component.html',
  styleUrls: ['./crearevento.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class CreareventoComponent{
  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService) {}
  imagenSeleccionada: File | null = null;
  dataEvento! : EventoI;
  crearForm = new FormGroup({
    nombre: new FormControl('',Validators.required),
    descripcion : new FormControl('',Validators.required),
    encargado : new FormControl('',Validators.required),
    fechaFin : new FormControl('',Validators.required),
    fechaIni : new FormControl('',Validators.required),
    requisitos : new FormControl('',Validators.required),
    lugar : new FormControl('',Validators.required),
    id_tipoEventos : new FormControl('',Validators.required),
    estado: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
  });
  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);

    if (file) {
      this.imagenSeleccionada = file;
    }
  }

  crearEvento(datos:any){
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
    formData.append('id_tipoEventos', datos.id_tipoEventos.toString());
    formData.append('estado', datos.estado);
    formData.append('imagen', this.imagenSeleccionada as File);

    console.log(formData);
    Swal.fire({
      title: '¿Estás seguro de crear el evento?',
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
          'Se ha creado el evento con éxito',
          'success'
        ).then(() => {
          this.router.navigate(['/admin/eventos']);
        });
      }
    });
    
  }
  crear(data:any){
    this.apiService.postEvent(data).subscribe(data=>{
      console.log(data);
    })
  }
  
}
