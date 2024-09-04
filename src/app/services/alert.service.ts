import { Injectable } from '@angular/core';
import { Alert } from '../interfaces/alert';
import { Observable, Subject } from 'rxjs';
import { CommonModule, NgClass } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  private alert$ = new Subject<Alert>();

  setAlert(alert: Alert): void {
    this.alert$.next(alert);
  }

  getAlert(): Observable<Alert> {
    return this.alert$.asObservable();
  }

  resetAlert(): void {
    this.alert$ = new Subject<Alert>();
  }
}
