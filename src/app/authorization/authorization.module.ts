import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';

@NgModule({
  declarations: [SingInComponent, SingUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'login',
        component: SingInComponent,
      },
      {
        path: 'register',
        component: SingUpComponent,
      },
    ]),
  ],
})
export class AuthorizationModule {}
