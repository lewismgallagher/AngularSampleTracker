import { Component, inject, input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Rack } from '../../interfaces/rack';
import { error } from 'console';
import { RouterLink, RouterModule } from '@angular/router';
import { SampleRackService } from '../../services/sample-rack.service';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-rack-search',
  standalone: true,
  imports: [NgFor, RouterModule, FormsModule],
  templateUrl: './rack-search.component.html',
  styleUrl: './rack-search.component.css',
})
export class RackSearchComponent {
  rackList: Rack[] = [];

  id!: number;
  name!: string;

  service: SampleRackService = inject(SampleRackService);

  constructor() {}

  search(): void {
    this.service.searchRacks(this.id, this.name).subscribe({
      next: (response: Rack[]) => {
        this.rackList = response;
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }
}
