import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { LoginUser } from 'src/app/shared/models/login-user-interface';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingInComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form!: FormGroup;
  submitted: boolean = false;
  errMsg = new Subject<string>();

  constructor(private authService: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public singIn() {
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
        this.errMsg.next(error.error.message);
        this.submitted = false;
      },
    });
    this.subscriptions.push(loginSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
