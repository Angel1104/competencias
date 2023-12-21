import { Component,OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';
import { EventoI } from "../../../../models/eventoComp.interface";

@Component({
  selector: 'app-visualizarevento',
  templateUrl: './visualizarevento.component.html',
  styleUrls: ['./visualizarevento.component.css']
})
export class VisualizareventoComponent implements OnInit {
  constructor(private router: Router, private activaterouter:ActivatedRoute,private apiService: ApiService) {}

  evento!:EventoI;

  tiposEventos: any;

  ngOnInit(): void {
      let eventoId = this.activaterouter.snapshot.paramMap.get('id');
      if (eventoId !== null) {
        this.getData(parseInt(eventoId, 10));
      } else {
        this.getData(0);
      }
      console.log(eventoId);
  }

  verTipo() {
    let index :any = this.evento.id_tipoEventos.toString() ;
    return this.tiposEventos[index - 1].nombre.toString()
  }
  getData(id:Number){
    this.apiService.getEventById(id).subscribe(data=>{
      this.evento = data;
      console.log(this.evento);
      
    })
    this.apiService.getTipoEventos().subscribe(data2=>{
      this.tiposEventos = data2;
      console.log(this.tiposEventos);
    })
  }
  mostrarSweetAlert(id:Number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el evento?',
      text: "No se podra deshacer la acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteEventId(id).subscribe(data=>{
          console.log(data);
        })
        Swal.fire(
          'Eliminado!',
          'Se ha eliminado el evento con éxito',
          'success'
        ).then(() => {
          this.router.navigate(['/admin/eventos']);
        });
      }
    });
  }
  eliminarevento(id:Number){
    this.apiService.deleteEventId(id).subscribe();
  }
  editarEvento(id:Number){
    this.router.navigate(['/admin/editarevento',id]);
  }

  verInteresados(id: Number){
    //console.log(id);
    this.router.navigate(['admin/verinteresados',id])
  }

}
