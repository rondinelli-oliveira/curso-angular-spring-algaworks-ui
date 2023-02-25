import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    TabViewModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
