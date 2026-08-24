import { ChangeDetectorRef, Component, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, forkJoin, Subscription } from 'rxjs';
import { catchError, finalize, switchMap, take } from 'rxjs/operators';
import { DataProviderService } from '../../../services/data-provider.service';
import { NewsService } from '../../../services/news.service';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { CardComponent } from '../../ui-components/card/card.component';

type NewsType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt';

interface NewsItem {
  id: number;
  deleted: boolean;
  type: NewsType;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent?: number;
  poll?: number;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts?: number[];
  descendants: number;
}
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent]
})
export class NewsComponent implements OnDestroy {
  private _dataProviderService = inject(DataProviderService);
  private _route = inject(ActivatedRoute);
  private _newsService = inject(NewsService);
  private _changeDetectorRef = inject(ChangeDetectorRef);

  newsItems: NewsItem[] = [];
  dummyBody = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, ' +
    '…when an unknown printer took a galley of type and scrambled';

  private _mainUrlType = '';
  private _top = 10;
  private _loadMoreSubscription: Subscription;
  private _routeSubscription: Subscription;

  constructor() {

      this._loadMoreSubscription = this._newsService.loadMore$.subscribe(() => {
        this._newsService.loading(true);
        this._top += this._top;
        this._getItems();
      });

      this._routeSubscription = this._route.params.subscribe((params) => {
        this._resetTop();
        this.newsItems = [];
        this._changeDetectorRef.markForCheck();
        this._setNewsType(params.type);
        this._getItems();
      });

      TimeAgo.addDefaultLocale(en);
  }

  ngOnDestroy(): void {
    if (this._loadMoreSubscription) {
      this._loadMoreSubscription.unsubscribe();
    }
    if (this._routeSubscription) {
      this._routeSubscription.unsubscribe();
    }
  }

  getBodyText(text: string): string {
    return text ? text : this.dummyBody;
  }

  getComments(numberOfComments: number): string {
    if (numberOfComments > 1) {
      return numberOfComments + ' comments';
    } else if (numberOfComments === 1) {
      return numberOfComments + ' comment';
    } else {
      return 'no comments';
    }
  }

  getTime(time: number): string {
    const timeAgo = new TimeAgo('en-US');
    return timeAgo.format(new Date(time * 1000)); // Multiplied by 1000 so that the argument is in milliseconds, not seconds.
  }

  private _setNewsType(type: string): void {
    switch (type) {
      case 'new':
        this._mainUrlType = 'newstories';
        break;
      case 'best':
        this._mainUrlType = 'beststories';
        break;
      default:
        this._mainUrlType = 'topstories';
        break;
    }
  }

  private _getItems(): void {
    this._dataProviderService.getData<number[]>(this._mainUrlType, `?orderBy="$key"&limitToFirst=${this._top}`)
      .pipe(
        switchMap((ids) => forkJoin(ids.map((id: number) => this._dataProviderService.getData<NewsItem>('item/' + id).pipe(take(1))))),
        take(1),
        catchError((error) => {
          console.error('Failed to load news items', error);
          return EMPTY;
        }),
        finalize(() => this._newsService.loading(false))
      ).subscribe((items: NewsItem[]) => {
        this.newsItems = items;
        this._changeDetectorRef.markForCheck();
      });
  }

  private _resetTop(): void {
    this._top = 10;
  }

}
