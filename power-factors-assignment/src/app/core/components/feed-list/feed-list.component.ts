import { Component, ViewChild } from '@angular/core';
import { HttpFeedService } from '../../../services/http-feed.service';
import { FeedLine } from '../../models/feed';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent {
  title = 'test';
  items: FeedLine[] = [];
  nextFeedId?: string;
  useSavedData = true;
  isLoading = false;

  @ViewChild(VirtualScrollerComponent) virtualScrollerContent?: VirtualScrollerComponent;

  constructor(
    private httpFeed: HttpFeedService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.httpFeed.useSavedData = this.useSavedData;
    this.fetchFeedNextPage();
  }

  ngAfterViewInit() {
    this.virtualScrollerContent?.parentScroll.addEventListener('scroll', this.infiniteScrollCheck.bind(this));
  }

  ngOnDestroy() {
    if (this.virtualScrollerContent?.parentScroll?.removeAllListeners) {
      this.virtualScrollerContent.parentScroll.removeAllListeners();
    }
  }

  fetchFeedNextPage() {
    if (this.isLoading) { return; } 

    this.isLoading = true;
    this.httpFeed.feed(this.nextFeedId).pipe(
      tap(response => {
        if (!response) {
          throw new Error();  
        }
      }),
      finalize(() => this.isLoading = false),
      catchError(error => {
        this.dialog.open(AlertDialogComponent, { data: this.useSavedData ? 'Unfortunately, there are no more saved data' : 'An error occured while trying to fetch the feed' });
        return EMPTY;
      })
    ).subscribe(response => {
      this.nextFeedId = response.next_id;
      this.items = [...this.items, ...response.items];
    });
  }

  infiniteScrollCheck(event: Event) {
    const target = event.target as HTMLElement;
    const threshold = target.offsetHeight;
    const currentScrollToTop = target.scrollHeight - target.scrollTop - target.offsetHeight;

    if (currentScrollToTop < threshold) {
      this.fetchFeedNextPage();
    }
  }

  useSavedDataToggled() {
    this.httpFeed.useSavedData = this.useSavedData;

    this.nextFeedId = undefined;
    this.items = [];
    this.fetchFeedNextPage();
  }
}
