import { Component, inject, input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Rack } from '../../interfaces/rack';
import { error } from 'console';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SampleRackService } from '../../services/sample-rack.service';
import { Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sample } from '../../interfaces/sample';
import { switchMap, take } from 'rxjs';
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

    this.getRackSamplesAndSampleTypes(rackId);
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

  public async getRackSamplesAndSampleTypes(id: number) {
    this.rack = await this.sampleService.getRackById(id);
    this.sampleTypesList = await this.sampleService.getSamplesTypes();
    this.sampleList = await this.sampleService.getSamplesFromRack(this.rack.id);
    this.createSampleRack();
  }

  public onSampleTypeSelect(event: Event) {
    var selection = (event.target as HTMLSelectElement).value;
    this.selectedSampleType = Number(selection);
  }

  public isNullOrWhiteSpace(str?: string): boolean {
    return !str || !str.trim();
  }

  public async onSampleEdit(sample: Sample) {
    // if not edited return

    if (sample.identifyingValue === sample.originalIdentifyingValue) return;

    // logic for deletion by removing unique value in textbox
    if (
      this.isNullOrWhiteSpace(sample.identifyingValue) &&
      this.isNullOrWhiteSpace(sample.originalIdentifyingValue) === false
    ) {
      await this.sampleService.deleteSample(sample.id!);
      this.RenewSampleInSamplesList(sample);
      return;
    }

    // delete existing sample from rack during overwrite
    if (sample.id !== undefined) {
      await this.sampleService.deleteSample(sample.id!);
      sample.id = 0;
    }

    // check if sample exists in this rack

    let sampleExistsInThisRack = this.checkEditedSampleExistsInThisRack(sample);

    if (sampleExistsInThisRack) {
      var existingSample = this.GetSampleFromRackByEditedSample(sample);

      this.UpdateExistingSample(existingSample, sample);

      await this.sampleService.updateSample(sample);
      sample.originalIdentifyingValue = sample.identifyingValue;

      this.RenewSampleInSamplesList(existingSample);
      this.sampleList.push(sample);
      return;
    }

    if (sampleExistsInThisRack === false) {
      let sampleExistsInOtherRack = await this.sampleService.checkSampleExists(
        sample.identifyingValue
      );
      if (sampleExistsInOtherRack) {
        existingSample = await this.sampleService.getSampleByIdentifyingValue(
          sample.identifyingValue
        );
        this.UpdateExistingSample(existingSample, sample);
        await this.sampleService.updateSample(sample);
        sample.originalIdentifyingValue = sample.identifyingValue;
      }
    }
    if (sample.id == 0 || sample.id == undefined) {
      sample.sampleTypeId = this.selectedSampleType;
      sample.sampleType = this.sampleTypesList.find(
        (x) => x.id === this.selectedSampleType
      )?.name;
      await this.sampleService.createSample(sample);
      sample.originalIdentifyingValue = sample.identifyingValue;
    }
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
        s.identifyingValue === sample.identifyingValue &&
        (s.columnNumber !== sample.columnNumber ||
          s.rowNumber !== sample.rowNumber)
    )!;
  }

  RenewSampleInSamplesList(existingSample: Sample) {
    this.sampleList = this.sampleList.filter((s) => s.id !== existingSample.id);
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
    editedSample.originalIdentifyingValue = editedSample.identifyingValue;
  }
}
