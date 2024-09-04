import { Component, inject } from '@angular/core';
import { Alert } from '../interfaces/alert';
import { AlertService } from '../services/alert.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  alertservice: AlertService = inject(AlertService);

  alert?: Alert;

  constructor() {}

  ngOnInit(): void {
    this.alertservice.getAlert().subscribe((alert) => {
      this.alert = alert;
    });
  }
  OnClose(): void {
    this.alert = undefined;
  }
}
