import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpDisneyService } from './http-disney.service';

describe('HttpDisneyService', () => {
  let service: HttpDisneyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
    ],
      providers: [
        HttpClient
      ]
    });

    service = TestBed.inject(HttpDisneyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
