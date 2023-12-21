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
  errorAgregarGanador: string = '';
  ganadorAgregado: boolean = false;



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
    if (this.ganadorAgregado) {
      this.errorAgregarGanador = 'Ya se ha agregado un ganador para esta competencia';
      return;
    }

    const ganadorId: number = parseInt(form.id, 10);

    if (isNaN(ganadorId)) {
      this.errorAgregarGanador = 'ID de ganador no válido';
      return;
    }

    const ganadorExistente = this.interesados.find(
      (interesado) => interesado.id === ganadorId
    );
    if (!ganadorExistente) {
      this.errorAgregarGanador = 'El ID del ganador no existe en la lista de interesados';
      return;
    }

    if (this.compId !== null) {
      const compIdNumber: number = parseInt(this.compId, 10);

      this.apiService.ganadorInd(compIdNumber, ganadorId).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Se ha agregado el ganador con éxito',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigate(['/admin']);
          });
        },
        (error) => {
          console.error('Error al agregar el ganador:', error);
          this.errorAgregarGanador =
            'Hubo un error al agregar el ganador. Por favor, intenta nuevamente más tarde.';
        }
      );
    } else {
      console.error('compId es nulo, no se puede agregar el ganador');
    }
  }

}