import { Component, inject, OnInit } from '@angular/core';
import { RackConfigService } from '../../../services/rack-config.service';
import { response } from 'express';
import { NgFor } from '@angular/common';
import { Rack } from '../../../interfaces/rack';
import { error } from 'console';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-rack-list',
  standalone: true,
  imports: [NgFor, RouterModule],
  templateUrl: './rack-list.component.html',
  styleUrl: './rack-list.component.css',
})
export class RackListComponent implements OnInit {
  rackList: Rack[] = [];

  rackService: RackConfigService = inject(RackConfigService);

  constructor() {}

  ngOnInit(): void {
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
