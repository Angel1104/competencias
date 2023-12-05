import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { EquipoI } from 'src/app/models/equipoComp.interface';

@Component({
  selector: 'app-registroequipo',
  templateUrl: './registroequipo.component.html',
  styleUrls: ['./registroequipo.component.css'],
})
export class RegistroequipoComponent {
  competenciasId! : string;

  constructor(private router: Router,private apiService: ApiService, private activaterouter:ActivatedRoute) {}

  ngOnInit(): void {
    this.competenciasId = this.activaterouter.snapshot.paramMap.get('id') || '';
  }

  dataEvento! : EquipoI;
  crearInteresadoForm = new FormGroup({
    nombreLider: new FormControl('',Validators.required),
    edadLider: new FormControl('',Validators.required),
    carreraLider: new FormControl('',Validators.required),
    codSISLider: new FormControl('',Validators.required),
    emailLider: new FormControl('',Validators.required),
    numeroLider: new FormControl('',Validators.required),
    universidadLider: new FormControl('',Validators.required),
    semestreLider: new FormControl('',Validators.required),

    nombre1: new FormControl('',Validators.required),
    edad1: new FormControl('',Validators.required),
    carrera1: new FormControl('',Validators.required),
    codSIS1: new FormControl('',Validators.required),
    universidad1: new FormControl('',Validators.required),

    nombre2: new FormControl('',Validators.required),
    edad2: new FormControl('',Validators.required),
    carrera2: new FormControl('',Validators.required),
    codSIS2: new FormControl('',Validators.required),
    universidad2: new FormControl('',Validators.required),

    nombre3: new FormControl('',Validators.required),
    edad3: new FormControl('',Validators.required),
    carrera3: new FormControl('',Validators.required),
    codSIS3: new FormControl('',Validators.required),
    universidad3: new FormControl('',Validators.required),

    nombre4: new FormControl('',Validators.required),
    edad4: new FormControl('',Validators.required),
    carrera4: new FormControl('',Validators.required),
    codSIS4: new FormControl('',Validators.required),
    universidad4: new FormControl('',Validators.required),

    nombre5: new FormControl('',Validators.required),
    edad5: new FormControl('',Validators.required),
    carrera5: new FormControl('',Validators.required),
    codSIS5: new FormControl('',Validators.required),
    universidad5: new FormControl('',Validators.required),

    nombre6: new FormControl('',Validators.required),
    edad6: new FormControl('',Validators.required),
    carrera6: new FormControl('',Validators.required),
    codSIS6: new FormControl('',Validators.required),
    universidad6: new FormControl('',Validators.required),
  });
  

  crearInteresado(datos:any){
    const formData = new FormData();

    formData.append('nombreLider', datos.nombreLider);
    formData.append('edadLider', datos.edadLider);
    formData.append('carreraLider', datos.carreraLider);
    formData.append('codSISLider', datos.codSISLider);
    formData.append('emailLider', datos.emailLider);
    formData.append('numeroLider', datos.numeroLider);
    formData.append('universidadLider', datos.universidadLider);
    formData.append('semestreLider', datos.semestreLider);

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
      title: '¿Estás seguro de registrar el equipo?',
      text: "No se podra deshacer la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(formData);
        this.crear(formData, parseInt(this.competenciasId,10));
        Swal.fire(
          'Creado!',
          'Se ha registrado el interesado con éxito',
          'success'
        ).then(() => {
          this.router.navigate(['/users/competencias']);
        });
      }
    });
    
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