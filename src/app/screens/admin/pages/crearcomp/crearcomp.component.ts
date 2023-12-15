import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
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

  crearForm: FormGroup;
  imagenSeleccionada: File | null = null;
  dataCompetencia! : CompetenciaI;

  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService, private fb: FormBuilder) {
  
    this.crearForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)]],
      descripcion : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-|_|!|#|%(|),.\sñÑ]{4,400}$/)]],
      encargado : ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,70}$/)]],
      fechaFin : ['', Validators.required],
      fechaIni : ['', Validators.required],
      requisitos : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-|_|!|#|%(|),.\sñÑ]{4,1000}$/)]],
      lugar : ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9-|_|!|#|%(|),.\sñÑ]{3,60}$/)]],
      id_tipoCompetencias : ['', Validators.required],
      estado: [false, Validators.required],
      imagen: [''],
      costo: ['', [Validators.required,Validators.pattern(/^[a-zA-Z0-9-|_|!|#|%(|),.\sñÑ]{1,6}$/)]],
      horarios: ['', Validators.pattern(/^[a-zA-Z0-9-|_|!|#|%(|),.\sñÑ]{1,30}$/)],
      email: ['', [Validators.required, Validators.pattern(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)]],
      umss: [false, Validators.required],
    });
  }

  //Controles
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
    return e.hasError('pattern') ? 'El encargado debe tener entre 3 y 50 caracteres, y no permite caracteres especiales como ser: - _ ! # % ( ) , . :' : '';
  }
  getFechaFinErrorMessage() {
    const fin = this.crearForm.get('fechaFin');
    if (!fin) {return 'Error en el formulario';}
    if (fin.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  getFechaIniErrorMessage() {
    const ini = this.crearForm.get('fechaIni');
    if (!ini) {return 'Error en el formulario';}
    if (ini.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
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
  getTipoCompetenciasErrorMessage() {
      const t = this.crearForm.get('id_tipoCompetencias');
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
    return c.hasError('pattern') ? 'El costo puede ser gratis' : '';
  }
  getHorariosErrorMessage() {
    const h = this.crearForm.get('horarios');
    if (!h) {return 'Error en el formulario';}
    if (h.hasError('pattern')) {
      return 'El horario debe tener entre 1 y 30 caracteres';
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

  crearCompetencia(){
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
    formData.append('id_tipoCompetencias', datos.id_tipoCompetencias.toString());
    formData.append('email', datos.email);
    formData.append('costo', datos.costo);
    if (datos.horarios) {formData.append('horarios', datos.horarios);}
    formData.append('estado', estado);
    formData.append('umss', umss);
    formData.append('imagen', this.imagenSeleccionada as File);

    console.log(formData);
    Swal.fire({
      icon: 'success',
      title: 'Competencia creada exitosamente',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
        this.crear(formData);
        this.router.navigate(['/admin/competencias']);
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
    this.apiService.postCompetencia(data).subscribe(data=>{
      console.log(data);
    })
  }

}
