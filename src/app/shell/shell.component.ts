import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnDestroy {

  loading$: Observable<boolean> = this._newsService.loading$;
  newIsActive: boolean = false;
  bestIsActive: boolean = false;

  private _routerSubscription: Subscription;

  constructor(
    private _router: Router,
    private _newsService: NewsService
  ) {

    this._routerSubscription = this._router.events
      .pipe(filter((event: any) => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) => {
        switch (event.snapshot.params.type) {
          case 'new':
            this.newIsActive = true;
            this.bestIsActive = false;
            break;
          case 'best':
            this.newIsActive = false;
            this.bestIsActive = true;
            break;
          default:
            break;
        }
      });
  }

  ngOnDestroy(): void {
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }
  }

  loadMore(): void {
    this._newsService.loadMoreNews();
  }

  hasClickedLink(param: string): void {
    switch (param) {
      case 'new':
        if(this.newIsActive){
          this._router.navigateByUrl('');
          this.newIsActive = false;
        }
        break;
      case 'best':
        if(this.bestIsActive){
          this._router.navigateByUrl('');
          this.bestIsActive = false;
        }
        break;
      default:
        break;
    }
  }

}
