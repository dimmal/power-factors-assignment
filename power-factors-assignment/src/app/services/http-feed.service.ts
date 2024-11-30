import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { feedData } from '../../assets/data/feed-data';
import { Observable, of } from 'rxjs';
import { Feed, FeedEntryContent } from '../core/models/feed';
import { feedContent } from 'src/assets/data/feed-data-content';

@Injectable({
  providedIn: 'root'
})
export class HttpFeedService {
  useSavedData: boolean;

  constructor(
    private http: HttpClient,
  ) { }

  feed(nextId?: string): Observable<Feed> {
    if (this.useSavedData) {
      const dataset = nextId ? feedData.find(feed => feed.id === nextId) : feedData[0];

      return of(<Feed>dataset);
    }

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJHZW9yZ2VEQE9ESU4tS29uc3VsdC5ubyIsImtpZCI6IjE3MmU3OWY2LTcxZWUtNDJiNy1hZTc1LTM3OTM0M2JiZWJkZCIsImlzcyI6Im5hdi1ubyIsImF1ZCI6ImZlZWQtYXBpLXYyIiwiaWF0IjoxNzI5MjU1NjMxLCJleHAiOm51bGx9.iWVPjNV0moSrsz4G1N2KEcB24Wiji4hY_HVNEeetdTY';
    const nextIdParam = nextId ? `/${nextId}` : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Feed>(`https://pam-stilling-feed.nav.no/api/v1/feed${nextIdParam}`, { headers });
  }
}
