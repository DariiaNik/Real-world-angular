import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { User } from 'src/app/shared/models/user-interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  user!: User;

  constructor(private authService: AuthorizationService, private userService: UserService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;

    if (this.authService.isAuthenticated()) {
      this.userService.getUser().subscribe((user) => {
        this.user = user;
      });
    }
  }
}
