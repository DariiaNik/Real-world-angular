import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthorizationService) {}

  isAuthenticated!: boolean;

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
