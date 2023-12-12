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
    nombre: new FormControl('',Validators.required),
    descripcion : new FormControl('',Validators.required),
    encargado : new FormControl('',Validators.required),
    fechaFin : new FormControl('',Validators.required),
    fechaIni : new FormControl('',Validators.required),
    requisitos : new FormControl('',Validators.required),
    lugar : new FormControl('',Validators.required),
    id_tipoCompetencias : new FormControl('',Validators.required),
    imagen : new FormControl('',Validators.required),
    estado : new FormControl('',Validators.required),
    umss : new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    costo: new FormControl('',Validators.required),
    horarios: new FormControl('',Validators.required),
  });

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
        'nombre': this.dataCompetencia.nombre || '',
        'descripcion': this.dataCompetencia.descripcion || '',
        'encargado': this.dataCompetencia.encargado || '',
        'fechaFin': this.dataCompetencia.fechaFin || '',
        'fechaIni': this.dataCompetencia.fechaIni || '',
        'requisitos': this.dataCompetencia.requisitos || '',
        'lugar': this.dataCompetencia.lugar || '',
        'id_tipoCompetencias': this.dataCompetencia?.id_tipoCompetencias?.toString() || '',
        'estado': this.dataCompetencia.estado || '',
        'umss': this.dataCompetencia.umss || '',
        'imagen': null,
        'email': this.dataCompetencia.email || '',
        'costo': this.dataCompetencia.costo.toString() || '',
        'horarios': this.dataCompetencia.horarios || '',

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
    
    const formDataConImagen = new FormData();
    Object.keys(form).forEach(key => {
    formDataConImagen.append(key, form[key]);
    });

  formDataConImagen.append('imagen', this.imagenControl as File);


    Swal.fire({
      title: '¿Estás seguro de editar la competencia?',
      text: "No se podra deshacer la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.editar(formDataConImagen,id);
        Swal.fire(
          'Editado!',
          'Se ha editado la competencia con éxito',
          'success'
        ).then(() => {
          this.router.navigate(['/admin/competencias']);
        });
      }
    });
  }
  editar(data:any,id:Number){
    this.apiService.putCompetencia(data,id).subscribe(data=>{
      console.log(data);
    })
  }
}
