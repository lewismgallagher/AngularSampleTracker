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
import { SampleType } from '../../interfaces/sample-type';

@Component({
  selector: 'app-samples',
  standalone: true,
  imports: [NgFor],
  templateUrl: './samples.component.html',
  styleUrl: './samples.component.css',
})
export class SamplesComponent {
  sampleList: Sample[] = [];
  sampleTypesList: SampleType[] = [];
  selectedSampleType: number = 1;
  rack!: Rack;

  sampleService = inject(SampleRackService);
  route: ActivatedRoute = inject(ActivatedRoute);

  constructor() {
    const rackId = Number(this.route.snapshot.params['id']);

    this.getRackAndSamples(rackId);
  }

  public createEmptySample(col: number, row: number, rackId: number): Sample {
    return { columnNumber: col, rowNumber: row, rackId: rackId };
  }

  public createSampleRack() {
    var counter = 0;
    for (let r = 1; r < this.rack.numberOfRows + 1; r++) {
      for (let c = 1; c < this.rack.numberOfColumns + 1; c++) {
        if (this.checkSampleExistsInRack(c, r)) {
          continue;
        }
        this.sampleList.push(this.createEmptySample(c, r, this.rack.id));
      }
    }
  }

  public checkSampleExistsInRack(col: number, row: number): boolean {
    return this.sampleList.some(
      (s) => s.columnNumber == col && s.rowNumber == row
    );
  }

  public getSamples(id: number, col: number, row: number) {
    this.sampleService.getSamplesFromRack(id).subscribe({
      next: (response: Sample[]) => {
        this.sampleList = response;
        this.createSampleRack();
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  public getRackAndSamples(id: number) {
    this.sampleService.getRackById(id).subscribe({
      next: (response: Rack) => {
        this.rack = response;
        this.getSampleTypes();
        this.getSamples(id, response.numberOfColumns, response.numberOfRows);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  public getSampleTypes() {
    this.sampleService.getSamplesTypes().subscribe({
      next: (response: SampleType[]) => {
        this.sampleTypesList = response;
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  onSampleTypeSelect(event: Event) {
    var selection = (event.target as HTMLSelectElement).value;
    this.selectedSampleType = Number(selection);
  }
}
