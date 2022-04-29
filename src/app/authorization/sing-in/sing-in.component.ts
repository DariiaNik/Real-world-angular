import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { LoginUser } from 'src/app/shared/models/login-user-interface';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
})
export class SingInComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted: boolean = false;
  errorMesages!: string;
  subscriptions: Subscription[] = [];

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

    const loginSubscription: Subscription = this.authService.login(user).subscribe({
      next: () => {
        this.form.reset;
        this.router.navigate(['/home']);
        this.submitted = false;
      },
      error: (error: HttpErrorResponse) => {
        const errors = Object.entries(error.error.errors)
          .map((entries) => entries.join(' '))
          .join(',');
        this.errorMesages = errors;
        this.submitted = false;
      },
    });
    this.subscriptions.push(loginSubscription);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
