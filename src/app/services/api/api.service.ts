import { Injectable } from '@angular/core';
import { LoginI } from "../../models/login.interface";
import { EventoI } from "../../models/eventoComp.interface";
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { EventoEditI } from 'src/app/models/evento.interface';
import { CompetenciaI } from "../../models/competenciaComp.interface";
import { CompetenciaEditI } from 'src/app/models/competencia.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url='https://wanting-circle-production.up.railway.app/api/'

  constructor(private http: HttpClient) { }

  loginByEmail(form:LoginI):Observable<any>{
    return this.http.post<any>(this.url+'login',form);
  }

  getAllEvents():Observable<EventoI[]>{
    return this.http.get<any>(this.url+'Eventos');
  }

  getEventById(id : Number) : Observable<EventoI> {
    return this.http.get<any>(this.url+'Eventos/'+id);
  }

  deleteEventId(id : Number) : Observable<any>{
    return this.http.delete<any>(this.url+'Eventos/'+id)
  }

  putEvent(evento:EventoEditI,id : Number):Observable<any>{
    return this.http.post<any>(this.url+'Eventos/'+id,evento)
  }

  postEvent(evento:EventoEditI):Observable<any>{
    return this.http.post<any>(this.url+'Eventos/',evento)
  }

  getAllCompetencias():Observable<CompetenciaI[]>{
    return this.http.get<any>(this.url+'Competencias');
  }

  getCompetenciasById(id : Number) : Observable<CompetenciaI> {
    return this.http.get<any>(this.url+'Competencias/'+id);
  }

  deleteCompetenciaId(id : Number) : Observable<any>{
    return this.http.delete<any>(this.url+'Competencias/'+id)
  }

  putCompetencia(competencias:CompetenciaEditI,id : Number):Observable<any>{
    return this.http.post<any>(this.url+'Competencias/'+id,competencias)
  }

  postCompetencia(competencias:CompetenciaEditI):Observable<any>{
    return this.http.post<any>(this.url+'Competencias/',competencias)
  }

}
