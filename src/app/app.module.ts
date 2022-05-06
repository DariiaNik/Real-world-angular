import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizationInterceptor } from 'src/app/shared/services/authorization.interceptor';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, RouterModule, SharedModule],
  exports: [HttpClientModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
