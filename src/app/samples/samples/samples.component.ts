import { Component, inject, input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Rack } from '../../interfaces/rack';
import { error } from 'console';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SampleRackService } from '../../services/sample-rack.service';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sample } from '../../interfaces/sample';
import { take } from 'rxjs';
import { SampleType } from '../../interfaces/sample-type';
import { SampleTextboxComponent } from '../sample-textbox/sample-textbox.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-samples',
  standalone: true,
  imports: [NgFor, SampleTextboxComponent],
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

  public async getSamples(id: number, col: number, row: number) {
    await this.sampleService.getSamplesFromRack(id).subscribe({
      next: (response: Sample[]) => {
        this.sampleList = response;
        this.createSampleRack();
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  public async getRackAndSamples(id: number) {
    await this.sampleService.getRackById(id).subscribe({
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

  public async getSampleTypes() {
    await this.sampleService.getSamplesTypes().subscribe({
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

  isNullOrWhiteSpace(str?: string): boolean {
    return !str || !str.trim();
  }

  async onSampleEdit(sample: Sample) {
    if (sample.identifyingValue === sample.originalIdentifyingValue) return;

    if (
      this.isNullOrWhiteSpace(sample.identifyingValue) &&
      this.isNullOrWhiteSpace(sample.originalIdentifyingValue) === false
    ) {
      await this.deleteSample(sample.id!);
      this.RenewSampleInSamplesList(sample);
      console.log('this should return');
      return;
    }
    console.log('shouldve returned');
    if (sample.id != 0 || sample.id != undefined) {
      await this.sampleService.deleteSample(sample.id!);
      sample.id = 0;
      console.log('delete called');
    }
    var sampleExistsInThisRack = this.checkEditedSampleExistsInThisRack(sample);
    if (sampleExistsInThisRack) {
      console.log('sample exists check called');
      var existingSample = this.GetSampleFromRackByEditedSample(sample);
      this.UpdateExistingSample(existingSample, sample);
      console.log(sample);
      console.log(existingSample.identifyingValue + ' existing sample');
      this.RenewSampleInSamplesList(existingSample);

      console.log(sample.identifyingValue + ' new edited sample');
      console.log(existingSample.identifyingValue + ' new existing sample');
    }

    await this.sampleService
      .checkSampleExists(sample.identifyingValue)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (sampleExistsInThisRack === false && res) {
            console.log(res);
            this.sampleService
              .getSampleByIdentifyingValue(sample.identifyingValue)
              .pipe(take(1))
              .subscribe({
                next: (s) => {
                  this.UpdateExistingSample(s, sample);
                  console.log(sample);

                  this.sampleService
                    .updateSample(sample)
                    .pipe(take(1))
                    .subscribe({
                      next: () => {
                        console.log(sample);
                        sample.originalIdentifyingValue =
                          sample.identifyingValue;
                      },
                    });
                },
              });
          }
        },
      });

    if (sample.id === 0 || sample.id === undefined) {
      sample.sampleTypeId = this.selectedSampleType;
      sample.sampleType = this.sampleTypesList.find(
        (x) => x.id === this.selectedSampleType
      )?.name;
      await this.sampleService
        .createSample(sample)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            console.log('sample created');
            console.log(sample);
            sample.originalIdentifyingValue = sample.identifyingValue;
          },
        });
    }
  }

  async deleteSample(id: number) {
    await this.sampleService
      .deleteSample(id)
      .pipe(take(1))
      .subscribe({
        next: () => {},
        error: (error: HttpErrorResponse) => {
          console.log(
            `failed to delete sample. Response from server: "HTTP Statuscode: ${error.status}: ${error.error}"`
          );
        },
      });
  }

  getSampleFromList(col: number, row: number): Sample {
    var sample = this.sampleList.find(
      (x) => x.columnNumber == col && x.rowNumber == row
    );

    if (sample != undefined) return sample;
    else {
      return { columnNumber: col, rowNumber: row };
    }
  }

  checkEditedSampleExistsInThisRack(sample: Sample): boolean {
    return this.sampleList.some(
      (s) =>
        s.identifyingValue == sample.identifyingValue &&
        (s.columnNumber != sample.columnNumber ||
          s.rowNumber != sample.rowNumber)
    );
  }

  GetSampleFromRackByEditedSample(sample: Sample): Sample {
    return this.sampleList.find(
      (s) =>
        s.identifyingValue == sample.identifyingValue &&
        (s.columnNumber != sample.columnNumber ||
          s.rowNumber != sample.rowNumber)
    )!;
  }

  RenewSampleInSamplesList(existingSample: Sample) {
    this.sampleList = this.sampleList.filter((x) => x.id != existingSample.id);
    var sample = this.createEmptySample(
      existingSample.columnNumber!,
      existingSample.rowNumber!,
      existingSample.rackId!
    );
    this.sampleList.push(sample);
  }

  UpdateExistingSample(existingSample: Sample, editedSample: Sample) {
    editedSample.id = existingSample.id;
    editedSample.sampleType = existingSample.sampleType;
    editedSample.sampleTypeId = existingSample.sampleTypeId;
  }
}
