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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
@Component({
  selector: 'app-create-rack',
  standalone: true,
  imports: [RouterModule, RouterLink, ReactiveFormsModule],
  templateUrl: './create-rack.component.html',
  styleUrl: './create-rack.component.css',
})
export class CreateRackComponent {
  rackService = inject(RackConfigService);

  constructor(private router: Router) {}

  success = false;
  errormessage = '';

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

    var postRequest = this.rackService
      .createRack(rack)
      .pipe(take(1))
      .subscribe({
        next: (createdRackFromServer) => {
          this.success = true;
        },
        error: (error: HttpErrorResponse) => {
          console.log(
            `failed to create new rack. Response from server: "HTTP Statuscode: ${error.status}: ${error.error}"`
          );
          this.errormessage = error.message;
        },
        complete: () => {
          //TODO show success toast
          this.router.navigateByUrl('Configuration/Racks');
        },
      });
  }
}
