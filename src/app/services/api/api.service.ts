import { Injectable } from '@angular/core';
import { LoginI } from "../../models/login.interface";
import { EventoI } from "../../models/eventoComp.interface";
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { EventoEditI } from 'src/app/models/evento.interface';
import { CompetenciaI } from "../../models/competenciaComp.interface";
import { CompetenciaEditI } from 'src/app/models/competencia.interface';

import { InteresadoI } from "../../models/interesadoComp.interface";
import { EquipoI } from "../../models/equipoComp.interface";

import { InteresadoEditI } from "../../models/interesado.interface";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlumss='http://codefusion.tis.cs.umss.edu.bo/api/';
  private url='https://wanting-circle-production.up.railway.app/api/';

  constructor(private http: HttpClient) { }

  loginByEmail(form:LoginI):Observable<any>{
    return this.http.post<any>(this.url+'Admins/login',form);
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
 //Interesados
getAllInteresados(): Observable<InteresadoI[]> {
  return this.http.get<InteresadoI[]>(`${this.url}Interesados`);
}

getInteresadoById(id: number): Observable<InteresadoI> {
  return this.http.get<InteresadoI>(`${this.url}Interesados/${id}`);
}

deleteInteresadoById(id: number): Observable<any> {
  return this.http.delete<any>(`${this.url}Interesados/${id}`);
}

// Crear Interesado
createInteresado(interesado: InteresadoI): Observable<any> {
  console.log("llega");
  console.log(interesado);
  return this.http.post<any>(`${this.url}Interesados`, interesado);
}

// Asociar un Interesado con un Evento
associateInteresadoWithEvento(eventoId: number, interesado: number): Observable<any> {
  return this.http.post<any>(`${this.url}Eventos/${eventoId}/Interesados/${interesado}`, interesado);
}

// Obtener Interesados para un Evento específico
getInteresadosByEventoId(eventoId: number): Observable<InteresadoI[]> {
  return this.http.get<InteresadoI[]>(`${this.url}Eventos/${eventoId}/Interesados`);
}

// Crear participante
createParticipante(interesado: InteresadoI): Observable<any> {
  return this.http.post<any>(`${this.url}Participantes`, interesado);
}

// Crear equipos
createEquipo(equipo: EquipoI): Observable<any> {
  return this.http.post<any>(`${this.url}Equipos`, equipo);
}

// Asociar un participante con una competencias
associateParticipanteWithComp(eventoId: number, interesado: InteresadoI): Observable<any> {
  console.log(interesado);
  return this.http.post<any>(`${this.url}Competencias/${eventoId}/Participantes/${interesado}`, interesado);
}

// Asociar un equipo con una competencias
associateEquipoWithComp(eventoId: number, equipo: EquipoI): Observable<any> {
  return this.http.post<any>(`${this.url}Competencias/${eventoId}/Equipos/${equipo}`, equipo);
}

// Obtener particpantes para una competencia específico
getParticipanteByCompId(eventoId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}Competencias/${eventoId}/Participantes`);
}

 //participantes
 getAllParticipantes(): Observable<InteresadoI[]> {
  return this.http.get<InteresadoI[]>(`${this.url}Participantes`);
}

//equipos
getAllEquipos(): Observable<EquipoI[]> {
  return this.http.get<EquipoI[]>(`${this.url}Equipos`);
}

getAllEquiposByComId(compId:number):Observable<any[]> {
  return this.http.get<any[]>(`${this.url}Competencias/${compId}/Equipos`)
}

//usuarios admins
getUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}Admins`);
}

createUser(interesado: LoginI): Observable<any> {
  return this.http.post<any>(`${this.url}Admins/register`, interesado);
}
//ganadores
postGanadorIndividual(competenciaId: number, ganadorId: number): Observable<any> {
  return this.http.post<any>(`${this.url}Competencias/${competenciaId}/GanadorIndividual/${ganadorId}`, {});
}

getGanadoresIndividuales(competenciaId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.url}Competencias/${competenciaId}/GanadoresIndividuales`);
}

// Mandar correos para eventos
enviarcorreoEvent(evento:EventoEditI,id : Number):Observable<any>{
  return this.http.post<any>(this.url+'enviar-correoEventos/'+id,evento)
}
//Mandar correos competencias
enviarcorreoCompInd(competencias:CompetenciaEditI,id : Number):Observable<any>{
  return this.http.post<any>(this.url+'enviar-correoCompetenciasIndi/'+id,competencias)
}
enviarcorreoCompGru(competencias:CompetenciaEditI,id : Number):Observable<any>{
  return this.http.post<any>(this.url+'enviar-correoCompetenciasGru/'+id,competencias)
}

//agregar ganador 
//indiv
ganadorInd(idComp : Number, id:Number):Observable<any>{
  return this.http.post<any>(`${this.url}Competencias/${idComp}/GanadorIndividual/${id}`,{})
}
getganadorInd(idComp : Number):Observable<any>{
  return this.http.get<any>(`${this.url}Competencias/${idComp}/GanadoresIndividuales`,{})
}

ganadorGrup(idComp : Number, id:Number):Observable<any>{
  return this.http.post<any>(`${this.url}Competencias/${idComp}/GanadorEquipo/${id}`,{})
}
getganadorGrup(idComp : Number):Observable<any>{
  return this.http.get<any>(`${this.url}Competencias/${idComp}/GanadoresEquipos`,{})
}

}
