import { Injectable } from '@angular/core';
import { RackListItemComponent } from '../configuration/rack/rack-list-item/rack-list-item.component';
import { Rack } from '../interfaces/rack';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RackConfigServiceService {
  // TODO add proper url
  url = 'https://localhost:7201/configuration/racks';

  allRacks!: Rack[];

  constructor(private http: HttpClient) {}

  getAllRacks(): Observable<Rack[]> {
    return this.http.get<Rack[]>('https://localhost:7201/configuration/racks');
  }
}
