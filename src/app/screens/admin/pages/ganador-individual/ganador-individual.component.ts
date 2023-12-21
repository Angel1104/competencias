import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { InteresadoI } from '../../../../models/interesadoComp.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ganador-individual',
  templateUrl: './ganador-individual.component.html',
  styleUrls: ['./ganador-individual.component.css'],
})
export class GanadorIndividualComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'telefono'];

  interesados: InteresadoI[] = [];
  ganador: InteresadoI[] = [];

  compId: string | null = null;
  errorAgregarGanador: string = '';
  ganadorAgregado: boolean = false;

  ganadorForm = new FormGroup({
    id: new FormControl('', Validators.required),
  });

  constructor(
    private apiService: ApiService,
    private activaterouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.compId = this.activaterouter.snapshot.paramMap.get('id');
    if (this.compId !== null) {
      this.apiService
        .getParticipanteByCompId(parseInt(this.compId, 10))
        .subscribe((data) => {
          this.interesados = data;
        });

      const compIdNumber: number = parseInt(this.compId, 10);
      this.apiService.getganadorInd(compIdNumber).subscribe((data) => {
        this.ganador = data;
        if (this.ganador.length > 0) {
          this.ganadorAgregado = true;
        }
      });
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
