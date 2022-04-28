import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { User } from 'src/app/shared/models/user-interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated$!: Observable<boolean>;
  user$!: Observable<User>;
  subscriptions: Subscription[] = [];
  user!: User;

  constructor(private authService: AuthorizationService, private userService: UserService) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.user$ = this.userService.user$;

    if (this.authService.isAuthenticated()) {
      this.getUser();
    }
  }

  private getUser() {
    const getUserSubscription: Subscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.subscriptions.push(getUserSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
