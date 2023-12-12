import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
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
  ngOnInit(): void {
    this.eventosId = this.activaterouter.snapshot.paramMap.get('id') || '';
  }
  dataEvento! : InteresadoI;
  crearForm: FormGroup;
  

  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService, private fb: FormBuilder) {
    this.crearForm = this.fb.group({
      nombre : ['', Validators.required],
      apellidos : ['', Validators.required],
      ci : ['', Validators.required],
      fecha_Nacimiento : ['', Validators.required],
      telefono : ['', Validators.required],
      email : ['', Validators.required],
      carrera : ['', Validators.required],
      semestre : ['', Validators.required],
      codSIS : ['', Validators.required],
    });
  }
  //Controles
  getNombreErrorMessage() {
    const n = this.crearForm.get('nombre');
    if (!n) {return 'Error en el formulario';}
    if (n.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getApellidoErrorMessage() {
    const a = this.crearForm.get('apellidos');
    if (!a) {return 'Error en el formulario';}
    if (a.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getSemestreErrorMessage() {
    const s = this.crearForm.get('semestre');
    if (!s) {return 'Error en el formulario';}
    if (s.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getFechaErrorMessage() {
    const f = this.crearForm.get('fecha_Nacimiento');
    if (!f) {return 'Error en el formulario';}
    if (f.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getCiErrorMessage() {
    const ci = this.crearForm.get('ci');
    if (!ci) {return 'Error en el formulario';}
    if (ci.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getCarreraErrorMessage() {
    const c = this.crearForm.get('carrera');
    if (!c) {return 'Error en el formulario';}
    if (c.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getEmailErrorMessage() {
    const e = this.crearForm.get('email');
    if (!e) {return 'Error en el formulario';}
    if (e.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getCodSisErrorMessage() {
    const sis = this.crearForm.get('codSIS');
    if (!sis) {return 'Error en el formulario';}
    if (sis.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getTelefonoErrorMessage() {
    const t = this.crearForm.get('telefono');
    if (!t) {return 'Error en el formulario';}
    if (t.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  //fin
  crearInteresado(){
    console.log('Formulario válido:', this.crearForm.valid);
    if (this.crearForm.valid) {
    const datos = this.crearForm.value;
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
      icon: 'success',
      title: 'Registrado exitosamente',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      console.log(formData);
      this.crear(formData, parseInt(this.eventosId,10));
      this.router.navigate(['/users/eventos']);
    });
  }else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hay errores en el formulario. Por favor, verifica los campos.',
    });
  }
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
