import { Component, inject, OnInit } from '@angular/core';
import { RackConfigService } from '../../../services/rack-config.service';
import { PostRack } from '../../../interfaces/postRack';
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
@Component({
  selector: 'app-create-rack',
  standalone: true,
  imports: [RouterModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './create-rack.component.html',
  styleUrl: './create-rack.component.css',
})
export class CreateRackComponent {
  rackService = inject(RackConfigService);
  alertservice: AlertService = inject(AlertService);
  router: Router = inject(Router);

  alertTypes = AlertEnum;

  rackForm = new FormGroup({
    name: new FormControl(undefined, [
      Validators.required,
      Validators.minLength(1),
    ]),
    columns: new FormControl(1, [Validators.required, Validators.min(1)]),
    rows: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  submitForm() {
    if (this.rackForm.valid === false) {
      return;
    }
    var rack = {} as PostRack;

    (rack.rackName = this.rackForm.value.name ?? ''),
      (rack.numberOfColumns = this.rackForm.value.columns ?? 0),
      (rack.numberOfRows = this.rackForm.value.rows ?? 0);

    this.rackService
      .createRack(rack)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('Configuration/Racks');

          this.alertservice.setAlert({
            type: this.alertTypes.success,
            text: 'Rack ' + rack.rackName + ' was saved successfully',
            headerText: 'Save Successful!',
          });
          console.log(rack.rackName);
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
}
