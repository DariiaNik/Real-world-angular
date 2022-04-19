import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { LoginUser } from 'src/app/shared/models/login-user-interface';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  singIn() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const user: LoginUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.login(user).subscribe(
      () => {
        this.form.reset;
        this.router.navigate(['/home']);
        this.submitted = false;
      },
      (err) => {
        this.submitted = false;
      }
    );
  }
}
