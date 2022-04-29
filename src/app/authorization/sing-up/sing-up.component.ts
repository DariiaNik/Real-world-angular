import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { NewUser } from 'src/app/shared/models/new-user-interface';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  submitted: boolean = false;
  errorMesages!: string;
  subscriptions: Subscription[] = [];

  constructor(private authService: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  singUp() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const newUser: NewUser = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password,
    };

    const registerSubscription: Subscription = this.authService.register(newUser).subscribe({
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
        console.log(errors);
        this.submitted = false;
      },
    });
    this.subscriptions.push(registerSubscription);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
