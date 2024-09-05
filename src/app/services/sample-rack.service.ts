import { Injectable } from '@angular/core';
import { Rack } from '../interfaces/rack';
import { PostRack } from '../interfaces/postRack';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import HTTP_OPTIONS from '../constants/HttpOptions';
import { error } from 'console';
import { Sample } from '../interfaces/sample';

@Injectable({
  providedIn: 'root',
})
export class SampleRackService {
  url = 'https://localhost:7201/samples';

  constructor(private http: HttpClient) {}

  searchRacks(id?: number, name?: string): Observable<Rack[]> {
    var idUrlFragment = '';
    var nameUrlFragment = '';

    if (id != undefined) {
      idUrlFragment = '?id=' + id;
    }
    if (id != undefined) {
      nameUrlFragment = '&name=' + name;
    }

    return this.http.get<Rack[]>(
      this.url + '/racks/search' + idUrlFragment + nameUrlFragment
    );
  }

  getRackById(id?: number): Observable<Rack> {
    return this.http.get<Rack>(`${this.url}/racks?Id=${id}`);
  }

  getSamplesFromRack(
    rackId: number,
    columnNumber: number,
    rowNumber: number
  ): Observable<Sample[]> {
    return this.http.get<Sample[]>(
      this.url +
        '?rackId=' +
        rackId +
        '&numberOfColumns=' +
        columnNumber +
        '&numberOfRows=' +
        rowNumber
    );
  }
}
