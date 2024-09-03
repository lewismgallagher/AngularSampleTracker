import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RackListComponent } from './configuration/rack/rack-list/rack-list.component';
import { RackDetailsComponent } from './configuration/rack/rack-details/rack-details.component';
import { CreateRackComponent } from './configuration/rack/create-rack/create-rack.component';
import { ErrorComponent } from './error/error.component';
export const routes: Routes = [
  {
    path: 'Configuration/Racks/Create',
    component: CreateRackComponent,
    title: 'Create Rack Page',
  },
  {
    path: 'Configuration/Racks/:id',
    component: RackDetailsComponent,
    title: 'Rack List Page',
  },
  {
    path: 'Configuration/Racks',
    component: RackListComponent,
    title: 'Rack List Page',
  },
  {
    path: 'Error',
    component: ErrorComponent,
    title: 'Error Page',
  },
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: '**',
    redirectTo: 'Error',
    title: 'Error Page',
  },
];
