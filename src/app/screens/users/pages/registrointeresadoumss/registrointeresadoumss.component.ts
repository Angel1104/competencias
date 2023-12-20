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
  selector: 'app-registrointeresadoumss',
  templateUrl: './registrointeresadoumss.component.html',
  styleUrls: ['./registrointeresadoumss.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class RegistrointeresadoumssComponent {
  
  eventosId! : string;
  ngOnInit(): void {
    this.eventosId = this.activaterouter.snapshot.paramMap.get('id') || '';
  }
  dataEvento! : InteresadoI;
  crearForm: FormGroup;
  

  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService, private fb: FormBuilder) {
    this.crearForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{3,30}$/)]],
      apellidos : ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{3,30}$/)]],
      ci : ['', [Validators.required, Validators.pattern(/^[0-9]{6,10}$/)]],
      fecha_Nacimiento : ['', [Validators.required, this.validateFecha]],
      telefono : ['', [Validators.required, Validators.pattern(/^[467][0-9]{7,8}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\d._%+-]+@(est\.umss\.edu|fcyt\.umss\.edu\.bo)$/)]],
      carrera : ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)],
      semestre: ['', Validators.pattern(/^[1-9]$/)],
      codSIS: ['', [Validators.required, Validators.pattern(/^[1-2]\d{8}$/)]],
    });
  }
  //Controles
  validateFecha(control: FormControl) {
    const fecha = new Date(control.value);
    const today = new Date();
    const edad = today.getFullYear() - fecha.getFullYear();
  
    return edad >= 15 ? null : { invalidFecha: true };
  }
  getFechaErrorMessage() {
    const f = this.crearForm.get('fecha_Nacimiento');
    if (!f) {return 'Error en el formulario';}
    if (f.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return f.hasError('invalidFecha') ? 'Solo acepta mayor igual a 15 años' : '';
  }
  getNombreErrorMessage() {
    const n = this.crearForm.get('nombre');
    if (!n) {return 'Error en el formulario';}
    if (n.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return n.hasError('pattern') ? 'El nombre debe tener entre 3 y 30 caracteres, y no permite caracteres especiales ni números' : '';
  }
  getApellidoErrorMessage() {
    const a = this.crearForm.get('apellidos');
    if (!a) {return 'Error en el formulario';}
    if (a.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return a.hasError('pattern') ? 'El apellido debe tener entre 3 y 30 caracteres, y no permite caracteres especiales ni números' : '';
  }
  getSemestreErrorMessage() {
    const s = this.crearForm.get('semestre');
    if (!s) {return 'Error en el formulario';}
    if (s.hasError('pattern')) {
      return 'El semestre solo acepta 1 dígito y no puede ser 0';
    }
    return '';
  }
  getCiErrorMessage() {
    const ci = this.crearForm.get('ci');
    if (!ci) {return 'Error en el formulario';}
    if (ci.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return ci.hasError('pattern') ? 'El ci debe tener entre 6 y 10 caracteres, y solo permite valores numericos' : '';
  }
  getCarreraErrorMessage() {
    const c = this.crearForm.get('carrera');
    if (!c) {return 'Error en el formulario';}
    if (c.hasError('pattern')) {
      return 'La carrera debe tener entre 3 y 20 caracteres, y no permite caracteres especiales';
    }
    return '';
  }
  getEmailErrorMessage() {
    const e = this.crearForm.get('email');
    if (!e) {return 'Error en el formulario';}
    if (e.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return e.hasError('pattern') ? 'Debe usar un correo institucional' : '';
  }
  getCodSisErrorMessage() {
    const sis = this.crearForm.get('codSIS');
    if (!sis) {return 'Error en el formulario';}
    if (sis.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return sis.hasError('pattern') ? 'El codSis solo acepta 9 dígitos, y solo permite comenzar con los valores "1" o "2"' : '';
  }
  getTelefonoErrorMessage() {
    const t = this.crearForm.get('telefono');
    if (!t) {return 'Error en el formulario';}
    if (t.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return t.hasError('pattern') ? 'El telefono debe tener máximo 8 dígitos y solo permite comenzar con 4, 6 o 7' : '';
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
    if (datos.semestre) {formData.append('semestre', datos.semestre);}
    if (datos.carrera) {formData.append('carrera', datos.carrera);}
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
