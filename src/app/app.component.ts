import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Rack } from './interfaces/rack';
import { RackConfigServiceService } from './services/rack-config-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavBarComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'SampleTracker';

  constructor(private httpClient: HttpClient) {}

  public async fetch() {
    await this.httpClient
      .get<Rack[]>('https://localhost:7201/configuration/racks')
      .subscribe((result) => {
        console.log(this);
      });
  }
}
