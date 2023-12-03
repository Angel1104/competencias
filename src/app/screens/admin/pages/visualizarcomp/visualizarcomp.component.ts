import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { CompetenciaI } from "../../../../models/competenciaComp.interface";

@Component({
  selector: 'app-visualizarcomp',
  templateUrl: './visualizarcomp.component.html',
  styleUrls: ['./visualizarcomp.component.css']
})
export class VisualizarcompComponent  implements OnInit {
  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService) {}

  competencias!:CompetenciaI;
  tiposCompetencias: { [key: string]: string } = {
    '1': 'Individual',
    '2': 'Grupal',
  };

  ngOnInit(): void {
      let competenciasId = this.activaterouter.snapshot.paramMap.get('id');
      if (competenciasId !== null) {
        this.getData(parseInt(competenciasId, 10));
      } else {
        this.getData(0);
      }
      console.log(competenciasId);
  }

  getData(id:Number){
    this.apiService.getCompetenciasById(id).subscribe(data=>{
      this.competencias = data;
      console.log("este es el punto");
      console.log(this.competencias);
    })
  }
  mostrarSweetAlert(id:Number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar la competencia?',
      text: "No se podra deshacer la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteCompetenciaId(id).subscribe(data=>{
          console.log(data);
        })
        Swal.fire(
          'Eliminado!',
          'Se ha eliminado la competencia con éxito',
          'success'
        ).then(() => {
          this.router.navigate(['/admin/competencias']);
        });
      }
    });
  }
  eliminarcompetencia(id:Number){
    this.apiService.deleteCompetenciaId(id).subscribe();
  }
  editarCompetencia(id:Number){
    this.router.navigate(['/admin/editarcompetencia',id]);
  }
  verInteresados(id: Number, idTipo:Number){
    //console.log(id);
    if (idTipo ==1) {
      this.router.navigate(['admin/verparticipantes',id])
    }else {
      this.router.navigate(['admin/verequipos',id])
    }
    
  }
}
