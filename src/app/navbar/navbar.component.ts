import { Component, DoCheck, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements DoCheck {
  isAuthenticated$!: Observable<boolean>;

  constructor(private authService: AuthorizationService) {}

  ngDoCheck(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }
}
