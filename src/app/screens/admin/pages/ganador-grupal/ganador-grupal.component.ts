import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { InteresadoI } from "../../../../models/interesadoComp.interface";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import Swal from 'sweetalert2';
import { EquipoI } from "../../../../models/equipoComp.interface";


@Component({
  selector: 'app-ganador-grupal',
  templateUrl: './ganador-grupal.component.html',
  styleUrls: ['./ganador-grupal.component.css']
})
export class GanadorGrupalComponent implements OnInit {
  displayedColumns: string[] = ['id','nombre', 'apellidos','telefono'];

  interesados: InteresadoI[] = [];

  equipos!: EquipoI[];
  ganador!: EquipoI[];

  compId: string | null = null;

  constructor(private apiService: ApiService,
    private activaterouter:ActivatedRoute,
    private router: Router
    ) {}

    ganadorForm = new FormGroup({
      id: new FormControl(''),
    });

  ngOnInit(): void {
    this.compId = this.activaterouter.snapshot.paramMap.get('id');
    if (this.compId !== null) {
      this.apiService.getParticipanteByCompId(parseInt(this.compId,10)).subscribe(data => {
        this.interesados = data;
        console.log("estos son los interesados");
        console.log(this.interesados);
      });

      this.apiService.getAllEquiposByComId(parseInt(this.compId,10)).subscribe(data => {
        this.equipos = data;
        console.log(this.equipos);
      });

      const compIdNumber: number = parseInt(this.compId, 10);
      this.apiService.getganadorGrup(compIdNumber).subscribe(data => {
        console.log(data);
        this.ganador = data;
      });
    } else {
      
    }
  }

  agregarGanador(form: any) {
    console.log(form);
    console.log(this.compId);
    if (this.compId !== null) {
      const compIdNumber: number = parseInt(this.compId, 10);
  
      this.apiService.ganadorGrup(compIdNumber, form.id).subscribe(data => {
      console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado el ganador con éxito',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // this.router.navigate(['/admin/competencias']);
        });
      }, error => {
        // Manejar errores si la llamada al servicio falla
        console.error('Error al agregar el ganador:', error);
      });
    } else {
      console.error('compId es nulo, no se puede agregar el ganador');
      // Manejar este caso si es necesario
    }
  }

}