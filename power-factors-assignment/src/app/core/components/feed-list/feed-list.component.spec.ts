import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { FeedListComponent } from './feed-list.component';

describe('FeedListComponent', () => {
  let fixture: ComponentFixture<FeedListComponent>;
  let component: FeedListComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        FeedListComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedListComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
