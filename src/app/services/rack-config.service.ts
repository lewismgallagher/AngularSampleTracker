import { Injectable } from '@angular/core';
import { Rack } from '../interfaces/rack';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
