import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { CompEditI } from "../../../../models/competenciaCompEdit.interface";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MAT_DATE_FORMATS } from '@angular/material/core';
// import { CompetenciaI } from 'src/app/models/competenciaComp.interface';

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
  selector: 'app-editarcomp',
  templateUrl: './editarcomp.component.html',
  styleUrls: ['./editarcomp.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
})
export class EditarcompComponent implements OnInit {
  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService) {}

  // evento!:EventoEditI;
  dataCompetencia! : CompEditI;
  imagenControl: File | null = null;

  editarForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)]),
    descripcion : new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9-|_|!|#|%(|),.\s]{4,300}$/)]),
    encargado : new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,70}$/)]),
    fechaFin : new FormControl('',Validators.required),
    fechaIni : new FormControl('',Validators.required),
    requisitos : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9-|_|!|#|%(|),.\s]{4,1000}$/)]),
    lugar : new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9-|_|!|#|%(|),.\s]{3,60}$/)]),
    id_tipoCompetencias : new FormControl('',Validators.required),
    imagen : new FormControl(''),
    estado : new FormControl('',[Validators.required, Validators.pattern(/^(activo|inactivo)$/i)]),
    costo: new FormControl('',[Validators.required, Validators.pattern(/^(0|[1-9][0-9]{0,2})$/)]),
    horarios: new FormControl('',  Validators.pattern(/^[a-zA-Z0-9-|_:!#%(),.\sñÑ]{1,30}$/)),
    email: new FormControl('', [Validators.required, Validators.pattern(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/)]),
    umss: new FormControl('',[Validators.required, Validators.pattern(/^(si|no)$/i)]),
  });
//controles
getNombreErrorMessage() {
  const n = this.editarForm.get('nombre');
  if (!n) {return 'Error en el formulario';}
  if (n.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return n.hasError('pattern') ? 'El nombre debe tener entre 3 y 50 caracteres, y no permite caracteres especiales como ser: - _ ! # % ( ) , . :' : '';
}
getDescripcionErrorMessage() {
  const d = this.editarForm.get('descripcion');
  if (!d) {return 'Error en el formulario';}
  if (d.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return d.hasError('pattern') ? 'La descipcion debe tener entre 4 y 300 caracteres' : '';
}
getEncargadoErrorMessage() {
  const e = this.editarForm.get('encargado');
  if (!e) {return 'Error en el formulario';}
  if (e.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return e.hasError('pattern') ? 'El encargado debe tener entre 3 y 50 caracteres, y no permite caracteres especiales como ser: - _ ! # % ( ) , . :' : '';
}
getFechaFinErrorMessage() {
  const fin = this.editarForm.get('fechaFin');
  if (!fin) {return 'Error en el formulario';}
  if (fin.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return '';
}
getFechaIniErrorMessage() {
  const ini = this.editarForm.get('fechaIni');
  if (!ini) {return 'Error en el formulario';}
  if (ini.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return '';
}
getRequisitosErrorMessage() {
  const r = this.editarForm.get('requisitos');
  if (!r) {return 'Error en el formulario';}
  if (r.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return r.hasError('pattern') ? 'Los Requisitos debe tener entre 4 y 1000 caracteres' : '';
}
getLugarErrorMessage() {
  const l = this.editarForm.get('lugar');
  if (!l) {return 'Error en el formulario';}
  if (l.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return l.hasError('pattern') ? 'El lugar debe tener entre 3 y 60 caracteres' : '';
}
getTipoEventosErrorMessage() {
    const t = this.editarForm.get('id_tipoEventos');
    if (!t) {return 'Error en el formulario';}
  if (t.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return '';
}
getCostoErrorMessage() {
  const c = this.editarForm.get('costo');
  if (!c) {return 'Error en el formulario';}
  if (c.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return c.hasError('pattern') ? 'El costo puede ser "0" o máximo 3 digitos los cuales no tengan "0" por delante' : '';
}
getHorariosErrorMessage() {
  const h = this.editarForm.get('horarios');
  if (!h) {return 'Error en el formulario';}
  if (h.hasError('pattern')) {
    return 'El horario debe tener entre 1 y 30 caracteres';
  }
  return '';
}
getEmailErrorMessage() {
  const e = this.editarForm.get('email');
  if (!e) {return 'Error en el formulario';}
  if (e.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return e.hasError('pattern') ? 'El email debe ser válido' : '';
}
getUmssErrorMessage() {
  const um = this.editarForm.get('umss');
  if (!um) {return 'Error en el formulario';}
  if (um.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return um.hasError('pattern') ? 'El campo solo acepta los valores "Si" y "No"' : '';
}
getEstadoErrorMessage() {
  const est = this.editarForm.get('estado');
  if (!est) {return 'Error en el formulario';}
  if (est.hasError('required')) {
    return 'Este campo es obligatorio';
  }
  return est.hasError('pattern') ? 'El campo solo acepta los valores "Activo" y "Inactivo"' : '';
}
//fin
  ngOnInit(): void {
      let competenciasEditId = this.activaterouter.snapshot.paramMap.get('id');
      if (competenciasEditId !== null) {
        this.getData(parseInt(competenciasEditId, 10));
      } else {
        this.getData(0);
      }
      console.log(competenciasEditId);
  }

  getData(id:Number){
    this.apiService.getCompetenciasById(id).subscribe(data=>{
      const { imagen, ...competenciasSinImagen } = data;

      this.dataCompetencia = competenciasSinImagen;
      this.editarForm.setValue({
        nombre: this.dataCompetencia.nombre || '',
        descripcion: this.dataCompetencia.descripcion || '',
        encargado: this.dataCompetencia.encargado || '',
        fechaFin: this.dataCompetencia.fechaFin || '',
        fechaIni: this.dataCompetencia.fechaIni || '',
        requisitos: this.dataCompetencia.requisitos || '',
        lugar: this.dataCompetencia.lugar || '',
        id_tipoCompetencias: this.dataCompetencia?.id_tipoCompetencias?.toString() || '',
        estado: this.dataCompetencia.estado || '',
        umss: this.dataCompetencia.umss || '',
        imagen: null,
        email: this.dataCompetencia.email || '',
        costo: this.dataCompetencia.costo.toString() || '',
        horarios: this.dataCompetencia.horarios || '',

      })
      console.log(this.editarForm.value);
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);

    if (file) {
      this.imagenControl = file;
    } else {
      this.imagenControl = null;
    }
  }

  submit(datos: any){
    console.log(datos);
    
  }

  editarCompetencia(form:any, id:Number){
    console.log(form);
    console.log(id);
    console.log(this.editarForm.valid);
    if (this.editarForm.valid) {
      const datos = this.editarForm.value;
      const fechaFinNew = datos.fechaFin ? new Date(datos.fechaFin) : null;
      const fechaIniNew = datos.fechaIni ? new Date(datos.fechaIni) : null;

      const fechaFinFormateada = fechaFinNew ? fechaFinNew.toISOString().split('T')[0] : null;
      const fechaIniFormateada = fechaIniNew ? fechaIniNew.toISOString().split('T')[0] : null;

      datos.fechaFin = fechaFinFormateada;
      datos.fechaIni = fechaIniFormateada;
      
      const formDataConImagen = new FormData();
      Object.keys(form).forEach(key => {
      formDataConImagen.append(key, form[key]);
    });

  formDataConImagen.append('imagen', this.imagenControl as File);

    Swal.fire({
      icon: 'success',
      title: 'Se ha editado la competencia con éxito',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.editar(formDataConImagen,id);
      //this.router.navigate(['/admin/competencias']);
    });
  }else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hay errores en el formulario. Por favor, verifica los campos.',
    });
  }
  }
  editar(data:any,id:Number){
    this.apiService.putCompetencia(data,id).subscribe(data=>{
      console.log(data);
      window.location.href = '/admin/competencias';
    })
  }
}
