import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { EventoEditI } from "../../../../models/evento.interface";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
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
export class CreareventoComponent implements OnInit{
  crearForm: FormGroup;
  imagenSeleccionada: File | null = null;
  dataEvento! : EventoI;
  eventos: any ;

  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService, private fb: FormBuilder) {
  
    
  this.crearForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)]],
    descripcion : ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9-|_|!|#|%(|),.\s]{4,300}$/)]],
    encargado : ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{3,70}$/)]],
    fechaIni: ['', [Validators.required, this.validateFechaIni]],
    fechaFin: ['', [Validators.required, this.validateFechaFin]],
    requisitos : ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9-|_|!|#|%(|),.\s]{4,1000}$/)]],
    lugar : ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9-|_|!|#|%(|),.\s]{3,60}$/)]],
    id_tipoEventos : ['', Validators.required],
    estado: [false, Validators.required],
    imagen: [''],
    costo: ['', [Validators.required, Validators.pattern(/^(0|[1-9][0-9]{0,2})$/)]],
    horarios: ['',  Validators.pattern(/^[a-zA-Z0-9-|_:!#%(),.\sñÑ]{1,300}$/)],
    email: ['', [Validators.required, Validators.pattern(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)]],
    umss: [false, Validators.required],
    horaInicio: ['',Validators.required],
    horaFin: ['', [Validators.required, this.validateHoraFin]],

  });
}

ngOnInit(): void {
  this.getdata();
}
getdata(){
  this.apiService.getTipoEventos().subscribe(data=>{
    this.eventos = data;
    console.log(this.eventos);
  })
}
  //Controles
  validateHoraFin = (control: FormControl) => {
    if (!this.crearForm) {
      return { invalidHoraFin: false };
    }
  
    const horaFin = control.value;
    const ini = this.crearForm.get('horaInicio');
  
    if (!ini || !ini.value) {
      return { invalidHoraFin: true, horaInicioVacia: true };
    }
  
    const horaInicio = ini.value;
  
    return horaFin > horaInicio ? null : { invalidHoraFin: true };
  };
  getHoraFinErrorMessage() {
    const fin = this.crearForm.get('horaFin');
    const ini = this.crearForm.get('horaInicio');
  
    if (!fin || !ini) {
      return 'Error en el formulario';
    }
  
    if (fin.hasError('required') || ini.hasError('required')) {
      return 'Llene primero la hora inicio';
    }
  
    return fin.hasError('invalidHoraFin') ? 'La hora de fin debe ser mayor a la hora de inicio' : '';
  }
  getHoraIniErrorMessage() {
    const ini = this.crearForm.get('horaInicio');
    if (!ini) {return 'Error en el formulario';}
    if (ini.hasError('required')) {
    return 'Este campo es obligatorio';
    }
    return '';
}
  validateFechaIni(control: FormControl) {
    const fechaInicio = new Date(control.value);
    const today = new Date();
  
    return fechaInicio >= today ? null : { invalidFechaIni: true };
  }
  validateFechaFin = (control: FormControl) => {
    if (!this.crearForm) {
      return { invalidFechaFin: false };
    }
    const fechaFin = new Date(control.value);
    const ini = this.crearForm.get('fechaIni');
    if (!ini || !ini.value) {
      return { invalidFechaFin: true, fechaIniVacia: true };
    }
    const fechaInicio = new Date(ini.value);
    return fechaFin >= fechaInicio ? null : { invalidFechaFin: true };
  };
  getFechaIniErrorMessage() {
    const ini = this.crearForm.get('fechaIni');
    if (!ini) {return 'Error en el formulario';}
    if (ini.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return ini.hasError('invalidFechaIni') ? 'La fecha inicio debe ser mayor a la fecha actual' : '';
  }
  getFechaFinErrorMessage() {
    const fin = this.crearForm.get('fechaFin');
    const ini = this.crearForm.get('fechaIni');
  
    if (!fin || !ini) {
      return 'Error en el formulario';
    }
  
    if (fin.hasError('required') || ini.hasError('required')) {
      return 'Llene la fecha inicial primero';
    }
    return fin.hasError('invalidFechaFin') ? 'La fecha fin debe ser mayor o igual a la fecha inicio' : '';
  }
  getNombreErrorMessage() {
    const n = this.crearForm.get('nombre');
    if (!n) {return 'Error en el formulario';}
    if (n.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return n.hasError('pattern') ? 'El nombre debe tener entre 3 y 50 caracteres, y no permite caracteres especiales como ser: - _ ! # % ( ) , . :' : '';
  }
  getDescripcionErrorMessage() {
    const d = this.crearForm.get('descripcion');
    if (!d) {return 'Error en el formulario';}
    if (d.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return d.hasError('pattern') ? 'La descipcion debe tener entre 4 y 300 caracteres' : '';
  }
  getEncargadoErrorMessage() {
    const e = this.crearForm.get('encargado');
    if (!e) {return 'Error en el formulario';}
    if (e.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return e.hasError('pattern') ? 'El encargado debe tener entre 3 y 70 caracteres, y no permite caracteres especiales como ser: - _ ! # % ( ) , . :' : '';
  }
  getRequisitosErrorMessage() {
    const r = this.crearForm.get('requisitos');
    if (!r) {return 'Error en el formulario';}
    if (r.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return r.hasError('pattern') ? 'Los Requisitos debe tener entre 4 y 1000 caracteres' : '';
  }
  getLugarErrorMessage() {
    const l = this.crearForm.get('lugar');
    if (!l) {return 'Error en el formulario';}
    if (l.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return l.hasError('pattern') ? 'El lugar debe tener entre 3 y 60 caracteres' : '';
  }
  getTipoEventosErrorMessage() {
      const t = this.crearForm.get('id_tipoEventos');
      if (!t) {return 'Error en el formulario';}
    if (t.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getCostoErrorMessage() {
    const c = this.crearForm.get('costo');
    if (!c) {return 'Error en el formulario';}
    if (c.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return c.hasError('pattern') ? 'El costo puede ser "0" o máximo 3 digitos los cuales no tengan "0" por delante' : '';
  }
  getHorariosErrorMessage() {
    const h = this.crearForm.get('horarios');
    if (!h) {return 'Error en el formulario';}
    if (h.hasError('pattern')) {
      return 'El horario debe tener entre 1 y 300 caracteres';
    }
    return '';
  }
  getEmailErrorMessage() {
    const e = this.crearForm.get('email');
    if (!e) {return 'Error en el formulario';}
    if (e.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return e.hasError('pattern') ? 'El email debe ser válido' : '';
  }
  //fin
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);

    if (file) {
      this.imagenSeleccionada = file;
    }
  }

  crearEvento(){
    console.log('Formulario válido:', this.crearForm.valid);
    if (this.crearForm.valid) {
    const datos = this.crearForm.value;
    const fechaInicio = new Date(datos.fechaIni);
    const fechaFin = new Date(datos.fechaFin);

    const fechaInicioISO = fechaInicio.toISOString().split('T')[0];
    const fechaFinISO = fechaFin.toISOString().split('T')[0];

    const estado = datos.estado ? 'Activo' : 'Inactivo';
    const umss = datos.umss ? 'Si' : 'No';

    const formData = new FormData();
    formData.append('nombre', datos.nombre);
    formData.append('descripcion', datos.descripcion);
    formData.append('encargado', datos.encargado);
    formData.append('fechaIni', fechaInicioISO);
    formData.append('fechaFin', fechaFinISO);
    formData.append('requisitos', datos.requisitos);
    formData.append('lugar', datos.lugar);
    formData.append('id_tipoEventos', datos.id_tipoEventos.toString());
    formData.append('estado', estado);
    formData.append('imagen', this.imagenSeleccionada as File);
    formData.append('costo', datos.costo);
    if (datos.horarios) {formData.append('horarios', datos.horarios);}
    formData.append('email', datos.email);
    formData.append('umss', umss);
    formData.append('horaInicio', datos.horaInicio);
    formData.append('horaFin', datos.horaFin);

    console.log(formData);
    Swal.fire({
      icon: 'success',
      title: 'Evento creado exitosamente',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
        this.crear(formData);
    });
  }else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hay errores en el formulario. Por favor, verifica los campos.',
    });
  }
  }
  crear(data:any){
    this.apiService.postEvent(data).subscribe(data=>{
      console.log(data);
      window.location.href = '/admin/eventos';
    })
  }
  
  
}
