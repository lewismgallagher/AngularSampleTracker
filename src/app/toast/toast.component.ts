import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ToastService } from '../services/toast.service';
import { ToastData } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          visibility: 'hidden',
          right: '-400px',
        })
      ),
      state(
        'open',
        style({
          right: '40px',
        })
      ),
      transition('open <=> closed', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class ToastComponent {
  constructor(public toastService: ToastService) {
    this.toastService.open.subscribe((data) => {
      if (data.show) {
      }
    });
  }
}
