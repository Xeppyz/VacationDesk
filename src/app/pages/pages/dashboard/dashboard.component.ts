import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public userServices: UserService = inject(UserService);
  constructor() {}
  getRole(): string {
    return this.userServices.getRole(); // Obtener el rol desde el servicio
  }
}
