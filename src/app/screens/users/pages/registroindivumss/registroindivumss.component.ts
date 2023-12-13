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
  selector: 'app-registroindivumss',
  templateUrl: './registroindivumss.component.html',
  styleUrls: ['./registroindivumss.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class RegistroindivumssComponent implements OnInit {
  competenciasId! : string;
  ngOnInit(): void {
    this.competenciasId = this.activaterouter.snapshot.paramMap.get('id') || '';
  }
  dataEvento! : InteresadoI;
  crearForm: FormGroup;
  
  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService, private fb: FormBuilder) {
    this.crearForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,30}$/)]],
      apellidos : ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,30}$/)]],
      ci : ['', [Validators.required, Validators.pattern(/^[0-9]{6,10}$/)]],
      fecha_Nacimiento : ['', Validators.required],
      telefono : ['', [Validators.required, Validators.pattern(/^[0-9]{3,8}$/)]],
      email : ['', [Validators.required, Validators.pattern(/^[a-zA-Z\d._%+-]+@est\.umss\.edu$/)]],
      carrera : ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,20}$/)],
      semestre : ['', Validators.pattern(/^[0-9]{1,3}$/)],
      codSIS : ['', Validators.pattern(/^[0-9]{5,10}$/)],
    });
  }
  //Controles
  getNombreErrorMessage() {
    const n = this.crearForm.get('nombre');
    if (!n) {return 'Error en el formulario';}
    if (n.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return n.hasError('pattern') ? 'El nombre debe tener entre 3 y 30 caracteres, y no permite caracteres especiales' : '';
  }
  getApellidoErrorMessage() {
    const a = this.crearForm.get('apellidos');
    if (!a) {return 'Error en el formulario';}
    if (a.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return a.hasError('pattern') ? 'El apellido debe tener entre 3 y 30 caracteres, y no permite caracteres especiales' : '';
  }
  getSemestreErrorMessage() {
    const s = this.crearForm.get('semestre');
    if (!s) {return 'Error en el formulario';}
    if (s.hasError('pattern')) {
      return 'El semestre debe tener entre 1 y 3 caracteres, y solo permite valores numericos';
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
    return sis.hasError('pattern') ? 'El codSis debe tener máximo 10 caracteres, y solo permite valores numericos' : '';
  }
  getTelefonoErrorMessage() {
    const t = this.crearForm.get('telefono');
    if (!t) {return 'Error en el formulario';}
    if (t.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return t.hasError('pattern') ? 'El telefono debe tener máximo 8 caracteres y solo permite valores numericos' : '';
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
    if (datos.semestre) {formData.append('semestre', datos.semestre);}
    if (datos.carrera) {formData.append('carrera', datos.carrera);}
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
      this.crear(formData, parseInt(this.competenciasId,10) );
        this.router.navigate(['/users/competencias']);
    });
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hay errores en el formulario. Por favor, verifica los campos.',
      });
    }
  }
  crear(data:any, idComp:number){
    this.apiService.createParticipante(data).subscribe(data=>{
      console.log(data);
      this.apiService.associateParticipanteWithComp(idComp, data.id).subscribe(data2=>{
        console.log(data2);
      })
    })
  }
}