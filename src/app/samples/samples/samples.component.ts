import { Component, inject, input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Rack } from '../../interfaces/rack';
import { error } from 'console';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SampleRackService } from '../../services/sample-rack.service';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sample } from '../../interfaces/sample';
import { RackConfigService } from '../../services/rack-config.service';
import { sample } from 'rxjs';

@Component({
  selector: 'app-samples',
  standalone: true,
  imports: [NgFor],
  templateUrl: './samples.component.html',
  styleUrl: './samples.component.css',
})
export class SamplesComponent {
  sampleList: Sample[] = [];
  rack!: Rack;
  sampleService = inject(SampleRackService);
  route: ActivatedRoute = inject(ActivatedRoute);

  service: SampleRackService = inject(SampleRackService);
  constructor() {
    const rackId = Number(this.route.snapshot.params['id']);

    this.getRackAndSamples(rackId);
  }

  public createSampleRack() {
    var counter = 0;
    for (let r = 1; r < this.rack.numberOfRows + 1; r++) {
      for (let c = 1; c < this.rack.numberOfColumns + 1; c++) {
        if (this.checkSampleExistsInRack(c, r)) {
          continue;
        }
      }
    }
  }

  public checkSampleExistsInRack(col: number, row: number): boolean {
    return this.sampleList.some(
      (s) => s.columnNumber == col && s.rowNumber == row
    );
  }

  public getSamples(id: number, col: number, row: number) {
    console.log(id);
    this.sampleService.getSamplesFromRack(id, col, row).subscribe({
      next: (response: Sample[]) => {
        this.sampleList = response;
        console.log(response);
        console.log(this.sampleList);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  public getRackAndSamples(id: number) {
    console.log(id);
    this.sampleService.getRackById(id).subscribe({
      next: (response: Rack) => {
        this.rack = response;
        this.getSamples(id, response.numberOfColumns, response.numberOfRows);
        console.log(response);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }
}
