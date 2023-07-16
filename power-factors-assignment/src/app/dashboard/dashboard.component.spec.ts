import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { reducers } from '../core/store';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../shared/material/material-module';
import { ChartComponent } from '../chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { filter, of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSkeletonLoaderModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        DashboardComponent,
        ChartComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.ngAfterViewInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
