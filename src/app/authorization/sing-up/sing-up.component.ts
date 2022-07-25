import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { NewUser } from 'src/app/shared/models/new-user-interface';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingUpComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form!: FormGroup;
  submitted: boolean = false;
  errMsg = new Subject<string>();

  constructor(readonly authService: AuthorizationService, readonly router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public singUp() {
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
        this.errMsg.next(error.error.message);
        this.submitted = false;
      },
    });
    this.subscriptions.push(registerSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
