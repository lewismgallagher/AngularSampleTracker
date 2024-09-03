import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum toastTypes {
  error,
  success,
}

export class ToastData {
  title?: string;
  content?: string;
  show?: boolean;
  type?: toastTypes;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  data = new ToastData();
  public open = new Subject<ToastData>();

  constructor() {}

  initiate(data: ToastData) {
    if (data.type) {
      this.data.type = toastTypes.error;
    }
    this.data = { ...data, show: true };
    this.open.next(this.data);
  }

  hide() {
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }
}
