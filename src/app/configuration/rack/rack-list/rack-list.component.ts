import { Component, inject } from '@angular/core';
import { RackListItemComponent } from '../rack-list-item/rack-list-item.component';
import { RackConfigServiceService } from '../../../services/rack-config-service.service';
@Component({
  selector: 'app-rack-list',
  standalone: true,
  imports: [RackListItemComponent],
  templateUrl: './rack-list.component.html',
  styleUrl: './rack-list.component.css',
})
export class RackListComponent {
  rackList: RackListItemComponent[] = [];
  rackService: RackConfigServiceService = inject(RackConfigServiceService);
  constructor() {
    this.rackService.getAllRacks().then((rl: RackListItemComponent[]) => {
      this.rackList = rl;
    });
  }
}
