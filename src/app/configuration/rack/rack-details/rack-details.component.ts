import { Component, inject, OnInit } from '@angular/core';
import { RackConfigService } from '../../../services/rack-config.service';

import { ActivatedRoute, Route } from '@angular/router';
import { error } from 'console';
import {
  RedirectCommand,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { AlertService } from '../../../services/alert.service';
import { AlertEnum } from '../../../enums/alert.enum';
import { CommonModule } from '@angular/common';
import { Rack } from '../../../interfaces/rack';

@Component({
  selector: 'app-rack-details',
  standalone: true,
  imports: [RouterModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './rack-details.component.html',
  styleUrl: './rack-details.component.css',
})
export class RackDetailsComponent {
  rackService = inject(RackConfigService);
  alertservice: AlertService = inject(AlertService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  alertTypes = AlertEnum;

  rackForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    columns: new FormControl(1, [Validators.required, Validators.min(1)]),
    rows: new FormControl(1, [Validators.required, Validators.min(1)]),
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

  submitForm() {
    if (this.rackForm.valid === false) {
      return;
    }
    var rack = {} as Rack;
    rack.id = this.rack.id;
    (rack.rackName = this.rackForm.value.name ?? ''),
      (rack.numberOfColumns = this.rackForm.value.columns ?? 0),
      (rack.numberOfRows = this.rackForm.value.rows ?? 0);

    this.rackService
      .updateRack(rack)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.alertservice.setAlert({
            type: this.alertTypes.success,
            text: 'Rack ' + rack.rackName + ' was saved successfully',
            headerText: 'Save Successful!',
          });
        },
        error: (error: HttpErrorResponse) => {
          console.log(
            `failed to create new rack. Response from server: "HTTP Statuscode: ${error.status}: ${error.error}"`
          );
          this.alertservice.setAlert({
            type: this.alertTypes.danger,
            text: 'Rack failed to save please try again.',
            headerText: 'Error, Rack not Saved',
          });
        },
      });
  }

  deleteRack() {
    console.log('delete clicked');
    this.rackService
      .deleteRack(this.rack.id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('Configuration/Racks');

          this.alertservice.setAlert({
            type: this.alertTypes.success,
            text: 'Rack ' + this.rack.rackName + ' was deleted successfully',
            headerText: 'Delete Successful!',
          });
        },
        error: (error: HttpErrorResponse) => {
          console.log(
            `failed to create new rack. Response from server: "HTTP Statuscode: ${error.status}: ${error.error}"`
          );
          this.alertservice.setAlert({
            type: this.alertTypes.danger,
            text: 'Rack failed to delete please try again.',
            headerText: 'Error, Rack not Deleted',
          });
        },
      });
  }
}
