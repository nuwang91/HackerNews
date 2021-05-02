import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { NewsService } from 'src/app/services/news.service';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

type NewsType = "job" | "story" | "comment" | "poll" | "pollopt";

interface NewsItem {
  id: number;
  deleted: boolean;
  type: NewsType;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: any;
  poll: any;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: any;
  descendants: number;
}
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnDestroy {

  newsItems: Array<NewsItem> = [];
  dummyBody: string = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, …when an unknown printer took a galley of type and scrambled';

  private _mainUrlType: string = '';
  private _top = 10;
  private _loadMoreSubscription: Subscription;
  private _routeSubscription: Subscription;

  constructor(
    private dataProviderService: DataProviderService,
    private route: ActivatedRoute,
    private newsService: NewsService) {

      this._loadMoreSubscription = this.newsService.loadMore$.subscribe(() => {
        this.newsService.loading(true);
        this._top += this._top;
        this.getItems();
      });

      this._routeSubscription = this.route.params.subscribe((params) => {
        this.resetTop();
        this.newsItems = [];
        this.newsService.loading(true);
        this.setNewsType(params.type);
        this.getItems();
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

  private setNewsType(type: string): void {
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

  private getItems(): void {
    this.dataProviderService.getData(this._mainUrlType, `?orderBy="$key"&limitToFirst=${this._top}`)
      .pipe(
        switchMap((ids) => forkJoin(ids.map((id: number) => {
          return this.dataProviderService.getData('item/' + id).pipe(take(1));
        })))
      ).pipe(take(1)).subscribe((items: any) => {
        this.newsItems = items;
        this.newsService.loading(false);
      });
  }

  private resetTop(): void {
    this._top = 10;
  }

}
