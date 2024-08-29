import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RackListComponent } from './configuration/rack/rack-list/rack-list.component';
import { RackDetailsComponent } from './configuration/rack/rack-details/rack-details.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'Configuration/Racks',
    component: RackListComponent,
    title: 'Rack Configuration Page',
  },
  {
    path: 'Configuration/Racks/:id',
    component: RackDetailsComponent,
    title: 'Rack Details Page',
  },
];
