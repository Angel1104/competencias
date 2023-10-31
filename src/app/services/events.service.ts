import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events!: Array<Event>;

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get('https://api.example.com/events');
  }

}
