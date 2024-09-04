import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';
import { AlertEnum } from './enums/alert.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavBarComponent,
    AlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SampleTracker';
  alertTypes = AlertEnum;
  constructor(private alertService: AlertService) {}
}
