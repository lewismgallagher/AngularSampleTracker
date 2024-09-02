import { Injectable } from '@angular/core';
import { Rack } from '../interfaces/rack';
import { PostRack } from '../interfaces/postRack';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import HTTP_OPTIONS from '../constants/HttpOptions';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class RackConfigService {
  url = 'https://localhost:7201/configuration/racks';

  allRacks!: Rack[];

  constructor(private http: HttpClient) {}

  getAllRacks(): Observable<Rack[]> {
    return this.http.get<Rack[]>('https://localhost:7201/configuration/racks');
  }

  getRackById(id: number): Observable<Rack> {
    return this.http.get<Rack>(`${this.url}/${id}`);
  }

  createRack(rack: PostRack): Observable<object> {
    var request = this.http.post(this.url + '/create/', rack, HTTP_OPTIONS);
    return request;
  }
}
