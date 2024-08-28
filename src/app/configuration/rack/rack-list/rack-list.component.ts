import { Component, inject } from '@angular/core';
import { RackListItemComponent } from '../rack-list-item/rack-list-item.component';
import { RackConfigServiceService } from '../../../services/rack-config-service.service';
import { response } from 'express';
import { NgFor } from '@angular/common';
import { Rack } from '../../../interfaces/rack';
import { error } from 'console';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-rack-list',
  standalone: true,
  imports: [RackListItemComponent, NgFor, RouterModule],
  templateUrl: './rack-list.component.html',
  styleUrl: './rack-list.component.css',
})
export class RackListComponent {
  rackList: Rack[] = [];
  rackListComponents: RackListItemComponent[] = [];
  rackService: RackConfigServiceService = inject(RackConfigServiceService);
  constructor() {
    this.rackService.getAllRacks().subscribe({
      next: (response: Rack[]) => {
        this.rackList = response;
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }
}
