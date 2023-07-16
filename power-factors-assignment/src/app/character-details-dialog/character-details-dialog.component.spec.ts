import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CharacterDetailsDialogComponent } from './character-details-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { reducers } from '../core/store';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../shared/material/material-module';
import { ArrayToStringPipe } from '../core/pipes/array-to-string.pipe';

describe('CharacterDetailsDialogComponent', () => {
  let component: CharacterDetailsDialogComponent;
  let fixture: ComponentFixture<CharacterDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [
        CharacterDetailsDialogComponent,
        ArrayToStringPipe
      ],
      providers: [
        MatDialog,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailsDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
