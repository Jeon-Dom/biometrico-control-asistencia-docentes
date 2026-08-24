import { Component } from '@angular/core';
import { LogoutButton } from '../../shared/logout-button/logout-button';

@Component({
  selector: 'app-dashboard-placeholder',
  imports: [LogoutButton],
  templateUrl: './dashboard-placeholder.html',
  styleUrl: './dashboard-placeholder.scss',
})
export class DashboardPlaceholder {}
