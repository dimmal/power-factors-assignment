import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';

import { StoreModule } from '@ngrx/store';
import { reducers } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import { DisneyEffects } from './core/store/disney/disney.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './shared/material/material-module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ArrayToStringPipe } from './core/pipes/array-to-string.pipe';
import { HighchartsChartModule } from 'highcharts-angular';
import { CharacterDetailsDialogComponent } from './character-details-dialog/character-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent,
    CharacterDetailsDialogComponent,

    ArrayToStringPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HighchartsChartModule,
    NgxSkeletonLoaderModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([DisneyEffects]),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
