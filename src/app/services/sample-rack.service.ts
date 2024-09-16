import { Injectable } from '@angular/core';
import { Rack } from '../interfaces/rack';
import { PostRack } from '../interfaces/postRack';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import HTTP_OPTIONS from '../constants/HttpOptions';
import { error } from 'console';
import { Sample } from '../interfaces/sample';
import { SampleType } from '../interfaces/sample-type';

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

  checkSampleExists(identifyingValue?: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.url}/checksampleexists?IdentifyingValue=${identifyingValue}`
    );
  }

  getSampleByIdentifyingValue(identifyingValue?: string): Observable<Sample> {
    return this.http.get<Sample>(
      `${this.url}/sampleidbyid?IdentifyingValue=${identifyingValue}`
    );
  }

  getSamplesFromRack(rackId: number): Observable<Sample[]> {
    return this.http.get<Sample[]>(this.url + '?rackId=' + rackId);
  }

  getSamplesTypes(): Observable<SampleType[]> {
    return this.http.get<SampleType[]>(this.url + '/sampletypes');
  }

  deleteSample(id: number): Observable<object> {
    var request = this.http.delete(this.url + '?id=' + id);
    return request;
  }

  createSample(sample: Sample): Observable<object> {
    var request = this.http.post(this.url, sample, HTTP_OPTIONS);
    return request;
  }

  updateSample(sample: Sample): Observable<object> {
    var request = this.http.put(this.url, sample, HTTP_OPTIONS);
    return request;
  }
}
