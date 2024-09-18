import { Injectable } from '@angular/core';
import { Rack } from '../interfaces/rack';
import { PostRack } from '../interfaces/postRack';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, Observable, of, Subscription } from 'rxjs';
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

  async getRackById(id?: number): Promise<Rack> {
    return await firstValueFrom(
      this.http.get<Rack>(`${this.url}/racks?Id=${id}`)
    );
  }

  async checkSampleExists(identifyingValue?: string): Promise<boolean> {
    return await firstValueFrom(
      this.http.get<boolean>(
        `${this.url}/checksampleexists?IdentifyingValue=${identifyingValue}`
      )
    );
  }

  async getSampleByIdentifyingValue(
    identifyingValue?: string
  ): Promise<Sample> {
    return await firstValueFrom(
      this.http.get<Sample>(
        `${this.url}/sampleidbyid?IdentifyingValue=${identifyingValue}`
      )
    );
  }

  async getSamplesFromRack(rackId: number): Promise<Sample[]> {
    return firstValueFrom(
      this.http.get<Sample[]>(this.url + '?rackId=' + rackId)
    );
  }

  async getSamplesTypes(): Promise<SampleType[]> {
    return await firstValueFrom(
      this.http.get<SampleType[]>(this.url + '/sampletypes')
    );
  }

  async deleteSample(id: number): Promise<object> {
    return await firstValueFrom(this.http.delete(this.url + '?id=' + id));
  }

  async createSample(sample: Sample): Promise<object> {
    return await firstValueFrom(this.http.post(this.url, sample, HTTP_OPTIONS));
  }

  async updateSample(sample: Sample): Promise<object> {
    return await firstValueFrom(this.http.put(this.url, sample, HTTP_OPTIONS));
  }
}
