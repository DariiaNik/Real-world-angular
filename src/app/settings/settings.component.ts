import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { User } from 'src/app/shared/models/user-interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form!: FormGroup;
  user!: User;
  isFormReady: boolean = false;

  constructor(private authService: AuthorizationService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl('https://api.realworld.io/images/smiley-cyrus.jpeg'),
      username: new FormControl(''),
      bio: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });

    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.updateForm();
    });
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
    this.userService.updateUser(user).subscribe();
    this.router.navigate(['/profile', this.user.username]);
  }
}
