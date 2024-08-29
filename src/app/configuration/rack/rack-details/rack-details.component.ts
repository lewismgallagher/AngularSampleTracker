import { Component, inject, OnInit } from '@angular/core';
import { RackConfigService } from '../../../services/rack-config.service';
import { response } from 'express';
import { NgFor } from '@angular/common';
import { Rack } from '../../../interfaces/rack';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { RouterLink, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rack-details',
  standalone: true,
  imports: [RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './rack-details.component.html',
  styleUrl: './rack-details.component.css',
})
export class RackDetailsComponent {
  rackService = inject(RackConfigService);
  route: ActivatedRoute = inject(ActivatedRoute);

  rackForm = new FormGroup({
    name: new FormControl(''),
    columns: new FormControl(0),
    rows: new FormControl(0),
  });

  public rack!: Rack;

  constructor() {
    const id = Number(this.route.snapshot.params['id']);

    this.rackService.getRackById(id).subscribe({
      next: (response: Rack) => {
        this.rack = response;

        this.rackForm.controls.name.patchValue(this.rack.rackName);
        this.rackForm.controls.rows.patchValue(this.rack.numberOfRows);
        this.rackForm.controls.columns.patchValue(this.rack.numberOfColumns);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }
}
