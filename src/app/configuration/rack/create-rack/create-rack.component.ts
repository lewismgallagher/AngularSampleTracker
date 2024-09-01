import { Component, inject, OnInit } from '@angular/core';
import { RackConfigService } from '../../../services/rack-config.service';
import { response } from 'express';
import { NgFor } from '@angular/common';
import { PostRack } from '../../../interfaces/postRack';
import { error } from 'console';
import { RouterLink, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-rack',
  standalone: true,
  imports: [RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './create-rack.component.html',
  styleUrl: './create-rack.component.css',
})
export class CreateRackComponent {
  rackService = inject(RackConfigService);

  rackForm = new FormGroup({
    name: new FormControl(''),
    columns: new FormControl(0),
    rows: new FormControl(0),
  });

  submitForm() {
    var rack = {} as PostRack;

    (rack.rackName = this.rackForm.value.name ?? ''),
      (rack.numberOfColumns = this.rackForm.value.columns ?? 0),
      (rack.numberOfRows = this.rackForm.value.rows ?? 0);

    var success = this.rackService.createRack(rack);
    // console.log(success);
  }
}
