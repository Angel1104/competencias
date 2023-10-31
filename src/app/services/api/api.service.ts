import { Injectable } from '@angular/core';
import { LoginI } from "../../models/login.interface";
import { EventoI } from "../../models/eventoComp.interface";
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { EventoEditI } from 'src/app/models/evento.interface';

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
    return this.http.put<any>(this.url+'Eventos/'+id,evento)
  }

  postEvent(evento:EventoEditI):Observable<any>{
    return this.http.post<any>(this.url+'Eventos/',evento)
  }
}
