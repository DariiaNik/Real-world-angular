import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [MatButtonModule, MatIconModule, HttpClientModule],
  exports: [MatButtonModule, MatIconModule, HttpClientModule],
})
export class SharedModule {}
