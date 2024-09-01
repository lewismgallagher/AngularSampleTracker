import { Injectable } from '@angular/core';
import { Rack } from '../interfaces/rack';
import { PostRack } from '../interfaces/postRack';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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

  //TODO return success or failure async await required
  createRack(rack: PostRack): boolean {
    this.http.post(this.url + '/create/', rack, HTTP_OPTIONS).subscribe({
      next: (createdRackFromServer) => {
        console.log(createdRackFromServer);
      },
      error: (error: HttpErrorResponse) => {
        console.log(
          `failed to create new rack. Response from server: "HTTP Statuscode: ${error.status}: ${error.error}"`
        );
      },
    });
    return true;
  }
}
