import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { FeedDetailsComponent } from './feed-details.component';

describe('FeedDetailsComponent', () => {
  let fixture: ComponentFixture<FeedDetailsComponent>;
  let component: FeedDetailsComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        FeedDetailsComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
