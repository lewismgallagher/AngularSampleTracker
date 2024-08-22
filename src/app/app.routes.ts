import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RackListComponent } from './configuration/rack/rack-list/rack-list.component';

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
];
