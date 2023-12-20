import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { EquipoI } from 'src/app/models/equipoComp.interface';


@Component({
  selector: 'app-registroequipoumss',
  templateUrl: './registroequipoumss.component.html',
  styleUrls: ['./registroequipoumss.component.css']
})
export class RegistroequipoumssComponent {
  competenciasId! : string;
  dataEvento! : EquipoI;
  crearForm: FormGroup;

  ngOnInit(): void {
    this.competenciasId = this.activaterouter.snapshot.paramMap.get('id') || '';
  }
  
  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService, private fb: FormBuilder) {
  
    this.crearForm = this.fb.group({
      nombreEquipo: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9-|_|!|#|%(|),.\s]{4,30}$/)]],

      nombreCoach: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{3,30}$/)]],
      edadCoach: ['', [Validators.required, Validators.pattern(/^[0-9]{1,2}$/), Validators.min(15)]],
      carreraCoach: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)]],
      codSISCoach: ['', [Validators.required, Validators.pattern(/^[1-2]\d{8}$/)]],
      emailCoach: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\d._%+-]+@(est\.umss\.edu|fcyt\.umss\.edu\.bo)$/)]],
      numeroCoach: ['', [Validators.required, Validators.pattern(/^[467][0-9]{7,8}$/)]],
      universidadCoach: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,30}$/)]],
      semestreCoach: ['', [Validators.required, Validators.pattern(/^[1-9]$/)]],

      nombre1: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{3,30}$/)]],
      edad1: ['', [Validators.required, Validators.pattern(/^[0-9]{1,2}$/), Validators.min(15)]],
      carrera1: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)]],
      codSIS1: ['', [Validators.required, Validators.pattern(/^[1-2]\d{8}$/)]],
      universidad1: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,30}$/)]],

      nombre2: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{3,30}$/)]],
      edad2: ['', [Validators.required, Validators.pattern(/^[0-9]{1,2}$/), Validators.min(15)]],
      carrera2: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)]],
      codSIS2: ['', [Validators.required, Validators.pattern(/^[1-2]\d{8}$/)]],
      universidad2: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,30}$/)]],
        
      nombre3: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{3,30}$/)],
      edad3: ['', [Validators.pattern(/^[0-9]{1,2}$/), Validators.min(15)]],
      carrera3: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)],
      codSIS3: ['', Validators.pattern(/^[1-2]\d{8}$/)],
      universidad3: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,30}$/)],

      nombre4: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{3,30}$/)],
      edad4: ['', [Validators.pattern(/^[0-9]{1,2}$/), Validators.min(15)]],
      carrera4: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)],
      codSIS4: ['', Validators.pattern(/^[1-2]\d{8}$/)],
      universidad4: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,30}$/)],

      nombre5: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{3,30}$/)],
      edad5: ['', [Validators.pattern(/^[0-9]{1,2}$/), Validators.min(15)]],
      carrera5: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)],
      codSIS5: ['', Validators.pattern(/^[1-2]\d{8}$/)],
      universidad5: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,30}$/)],

      nombre6: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ\s]{3,30}$/)],
      edad6: ['', [Validators.pattern(/^[0-9]{1,2}$/), Validators.min(15)]],
      carrera6: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,50}$/)],
      codSIS6: ['', Validators.pattern(/^[1-2]\d{8}$/)],
      universidad6: ['', Validators.pattern(/^[a-zA-ZÀ-ÿñÑ0-9\s]{3,30}$/)],
      
    });
  }
  //controles
  getNombreEquipoErrorMessage() {
    const ne = this.crearForm.get('nombreEquipo');
    if (!ne) {return 'Error en el formulario';}
    if (ne.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return ne.hasError('pattern') ? 'el nombre del equipo debe tener entre 4 y 30 caracteres' : '';
  }
  getNombreErrorMessage(fieldName: string) {
    const n = this.crearForm.get(fieldName);
    //const n = this.crearForm.get('nombre');
    if (!n) {return 'Error en el formulario';}
    if (n.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return n.hasError('pattern') ? 'El nombre debe tener entre 3 y 30 caracteres, y no permite caracteres especiales ni números' : '';
  }
  getEdadErrorMessage(fieldName: string) {
    const e = this.crearForm.get(fieldName);
    if (!e) {return 'Error en el formulario';}
    if (e.hasError('required')) {
      return 'Este campo es obligatorio';
    }if (e.hasError('min')){
      return 'La edad no puede ser menor a 15 años';
    }
    return e.hasError('pattern') ? 'la edad debe tener máximo 2 dígitos' : '';
  }
  getCarreraErrorMessage(fieldName: string) {
    const c = this.crearForm.get(fieldName);
    if (!c) {return 'Error en el formulario';}
    if (c.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return c.hasError('pattern') ? 'La carrera debe tener entre 3 y 20 caracteres, y no permite caracteres especiales' : '';
  }
  getCodSisErrorMessage(fieldName: string) {
    const sis = this.crearForm.get(fieldName);
    if (!sis) {return 'Error en el formulario';}
    if (sis.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return sis.hasError('pattern') ? 'El codSis solo acepta 9 dígitos, y solo permite comenzar con los valores "1" o "2"' : '';
  }
  getEmailErrorMessage() {
    const e = this.crearForm.get('emailCoach');
    if (!e) {return 'Error en el formulario';}
    if (e.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return e.hasError('pattern') ? 'Debe usar un correo institucional' : '';
  }
  getNumeroErrorMessage(fieldName: string) {
    const n = this.crearForm.get(fieldName);
    if (!n) {return 'Error en el formulario';}
    if (n.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return n.hasError('pattern') ? 'El número debe tener máximo 8 dígitos y solo permite comenzar con 4, 6 o 7' : '';
  }
  getUniversidadErrorMessage(fieldName: string) {
    const u = this.crearForm.get(fieldName);
    if (!u) {return 'Error en el formulario';}
    if (u.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return u.hasError('pattern') ? 'La universidad debe tener entre 3 y 30 caracteres, y no permite caracteres especiales' : '';
  }
  getSemestreErrorMessage() {
    const s = this.crearForm.get('semestreCoach');
    if (!s) {return 'Error en el formulario';}
    if (s.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return s.hasError('pattern') ? 'El semestre solo acepta 1 dígito y no puede ser 0' : '';
  }
  //fin
  crearInteresado(){
    console.log('Formulario válido:', this.crearForm.valid);
    if (this.crearForm.valid) {
    const datos = this.crearForm.value;
    const formData = new FormData();

    formData.append('nombreEquipo', datos.nombreEquipo);

    formData.append('nombreCoach', datos.nombreCoach);
    formData.append('edadCoach', datos.edadCoach);
    formData.append('carreraCoach', datos.carreraCoach);
    formData.append('codSISCoach', datos.codSISCoach);
    formData.append('emailCoach', datos.emailCoach);
    formData.append('numeroCoach', datos.numeroCoach);
    formData.append('universidadCoach', datos.universidadCoach);
    formData.append('semestreCoach', datos.semestreCoach);

    formData.append('nombre1', datos.nombre1);
    formData.append('edad1', datos.edad1);
    formData.append('carrera1', datos.carrera1);
    formData.append('codSIS1', datos.codSIS1);
    formData.append('universidad1', datos.universidad1);

    formData.append('nombre2', datos.nombre2);
    formData.append('edad2', datos.edad2);
    formData.append('carrera2', datos.carrera2);
    formData.append('codSIS2', datos.codSIS2);
    formData.append('universidad2', datos.universidad2);

    formData.append('nombre3', datos.nombre3);
    formData.append('edad3', datos.edad3);
    formData.append('carrera3', datos.carrera3);
    formData.append('codSIS3', datos.codSIS3);
    formData.append('universidad3', datos.universidad3);

    formData.append('nombre4', datos.nombre4);
    formData.append('edad4', datos.edad4);
    formData.append('carrera4', datos.carrera4);
    formData.append('codSIS4', datos.codSIS4);
    formData.append('universidad4', datos.universidad4);

    formData.append('nombre5', datos.nombre5);
    formData.append('edad5', datos.edad5);
    formData.append('carrera5', datos.carrera5);
    formData.append('codSIS5', datos.codSIS5);
    formData.append('universidad5', datos.universidad5);

    formData.append('nombre6', datos.nombre6);
    formData.append('edad6', datos.edad6);
    formData.append('carrera6', datos.carrera6);
    formData.append('codSIS6', datos.codSIS6);
    formData.append('universidad6', datos.universidad6);
    
    console.log(datos);
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
    console.log(data);
    
    this.apiService.createEquipo(data).subscribe(data=>{
      console.log(data);
      this.apiService.associateEquipoWithComp(idComp, data.id).subscribe(data2=>{
        console.log(data2);
      })
    })
  }
  
}