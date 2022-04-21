import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements DoCheck {
  constructor(private authService: AuthorizationService) {}
  isAuthenticated!: boolean;
  ngDoCheck(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
