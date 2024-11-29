import { Component, ViewChild } from '@angular/core';
import { HttpFeedService } from '../../../services/http-feed.service';
import { FeedLine } from '../../models/feed';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent {
  title = 'test';
  items: FeedLine[] = [];
  nextFeedId?: string;

  @ViewChild(VirtualScrollerComponent) virtualScrollerContent?: VirtualScrollerComponent;

  constructor(private httpFeed: HttpFeedService) { }

  ngOnInit() {
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
    this.httpFeed.feed(this.nextFeedId).subscribe(response => {
      console.log(response);
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
}
