import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { InteresadoI } from 'src/app/models/interesadoComp.interface';

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
  selector: 'app-registrointeresado',
  templateUrl: './registrointeresado.component.html',
  styleUrls: ['./registrointeresado.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})

export class RegistrointeresadoComponent {
  eventosId! : string;
  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.eventosId = this.activaterouter.snapshot.paramMap.get('id') || '';
  }

  dataEvento! : InteresadoI;
  crearInteresadoForm = new FormGroup({
    nombre : new FormControl('',Validators.required),
    apellidos : new FormControl('',Validators.required),
    ci : new FormControl('',Validators.required),
    fecha_Nacimiento : new FormControl('',Validators.required),
    telefono : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    carrera : new FormControl('',Validators.required),
    semestre : new FormControl('',Validators.required),
    codSIS : new FormControl('',Validators.required),
  });
  

  crearInteresado(datos:any){
    const fecha_Nacimiento = new Date(datos.fecha_Nacimiento);
    const fecha_NacimientoISO = fecha_Nacimiento.toISOString().split('T')[0];

    const formData = new FormData();

    formData.append('nombre', datos.nombre);
    formData.append('apellidos', datos.apellidos);
    formData.append('ci', datos.ci);
    formData.append('fecha_Nacimiento', fecha_NacimientoISO);
    formData.append('telefono', datos.telefono);
    formData.append('email', datos.email);
    formData.append('carrera', datos.carrera);
    formData.append('semestre', datos.semestre);
    formData.append('codSIS', datos.codSIS);

    console.log(formData);
    Swal.fire({
      title: '¿Estás seguro de registrar el interesado?',
      text: "No se podra deshacer la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.crear(formData, parseInt(this.eventosId,10));
        Swal.fire(
          'Creado!',
          'Se ha registrado el interesado con éxito',
          'success'
        ).then(() => {
          this.router.navigate(['/users/eventos']);
        });
      }
    });
    
  }

  crear(data:any, idEv:number){
    this.apiService.createInteresado(data).subscribe(data=>{
      console.log(data);
      const idIn = data.id;
      this.apiService.associateInteresadoWithEvento(idEv, idIn).subscribe(data2=>{
        console.log("relacion");
      })
    })
  }
}
