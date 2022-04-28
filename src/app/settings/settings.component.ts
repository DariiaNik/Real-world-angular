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
    this.userService.updateUser(user).subscribe((response) => {
      this.authService.setToken(response);
      console.log(response);
    });
    this.router.navigate(['/profile', this.user.username]);
  }
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhcmlpYThAZ21haWwuY29tIiwidXNlcm5hbWUiOiJEYXJpaWE4IiwiaWF0IjoxNjUxMDczMTY4LCJleHAiOjE2NTYyNTcxNjh9.UcvNyXlGvj641k5xNzUToS5SEmU5_OevYN6E1tlaMgQ"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhcmlpYThAZ21haWwuY29tIiwidXNlcm5hbWUiOiJEYXJpaWE4IiwiaWF0IjoxNjUxMDczMjk3LCJleHAiOjE2NTYyNTcyOTd9.LUpEgr-SUqpAPizJmbsIglQjFcy_Cdu3ez9xrgLpRGM"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhcmlpYThAZ21haWwuY29tIiwidXNlcm5hbWUiOiJEYXJpaWE4IiwiaWF0IjoxNjUxMDczMzUwLCJleHAiOjE2NTYyNTczNTB9.eUakPvkjXEZocG-U28-4ma7oxTtsLax3bs_KuEXbHJM"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhcmlpYThAZ21haWwuY29tIiwidXNlcm5hbWUiOiJEYXJpaWE4NSIsImlhdCI6MTY1MTA3MzQ5NywiZXhwIjoxNjU2MjU3NDk3fQ.UCrKphr_6cVuOL87UsM5usj7emUhRnlgwo8VTCuC7sw"
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhcmlpYThAZ21haWwuY29tIiwidXNlcm5hbWUiOiJEYXJpaWE4NSIsImlhdCI6MTY1MTA3MzQ5NywiZXhwIjoxNjU2MjU3NDk3fQ.UCrKphr_6cVuOL87UsM5usj7emUhRnlgwo8VTCuC7sw"
