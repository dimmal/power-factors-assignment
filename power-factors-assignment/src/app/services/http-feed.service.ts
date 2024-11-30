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

    const nextIdParam = nextId ? `/${nextId}` : '';

    return this.http.get<Feed>(`https://pam-stilling-feed.nav.no/api/v1/feed${nextIdParam}`);
  }
}
