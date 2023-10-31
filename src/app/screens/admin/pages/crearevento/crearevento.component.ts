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
  });

  crearEvento(datos:any){
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
      title: '¿Estás seguro de crear el evento?',
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
          'Se ha creado el evento con éxito',
          'success'
        ).then(() => {
          this.router.navigate(['/admin/eventos']);
        });
      }
    });
    
  }
  crear(data:EventoEditI){
    this.apiService.postEvent(data).subscribe(data=>{
      console.log(data);
    })
  }
  
}
