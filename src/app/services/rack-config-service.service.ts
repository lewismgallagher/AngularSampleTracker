import { Injectable } from '@angular/core';
import { RackListItemComponent } from '../configuration/rack/rack-list-item/rack-list-item.component';

@Injectable({
  providedIn: 'root',
})
export class RackConfigServiceService {
  // TODO add proper url
  url = 'Https://LocalHost';

  constructor() {}

  async getAllRacks(): Promise<RackListItemComponent[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
}
