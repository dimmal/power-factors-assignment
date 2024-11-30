import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonModule, DatePipe } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FeedListComponent } from './core/components/feed-list/feed-list.component';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTPInterceptor } from './core/interceptors/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    FeedListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSkeletonLoaderModule,
    VirtualScrollerModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
