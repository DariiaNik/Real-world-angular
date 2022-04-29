import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { User } from 'src/app/shared/models/user-interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form!: FormGroup;
  user!: User;
  isFormReady: boolean = false;
  errorMesages!: string;

  constructor(private authService: AuthorizationService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl('https://api.realworld.io/images/smiley-cyrus.jpeg'),
      username: new FormControl(''),
      bio: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });

    this.getUser();
  }

  private getUser() {
    const getUserSubscription: Subscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.updateForm();
    });
    this.subscriptions.push(getUserSubscription);
  }

  private updateForm() {
    this.form.patchValue({
      image: this.user.image,
      username: this.user.username,
      bio: this.user.bio,
      email: this.user.email,
    });
    this.isFormReady = true;
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  public updateUser() {
    const user: User = { ...this.form.value, token: this.user.token };

    const updateUserSubscription: Subscription = this.userService.updateUser(user).subscribe({
      next: (response) => {
        this.getUser();
        this.router.navigate(['/profile', response.user.username]);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.error);
        switch (error.error) {
          case 'Unique constraint failed on the fields: (`email`)':
            this.errorMesages = 'Email Has Already Been Taken';
            break;
          case 'Unique constraint failed on the fields: (`username`)':
            this.errorMesages = 'Username Has Already Been Taken';
            break;
        }
      },
    });
    this.subscriptions.push(updateUserSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
