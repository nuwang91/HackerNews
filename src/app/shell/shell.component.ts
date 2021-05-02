import { ApplicationRef, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ActivationEnd, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
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

  private _overlay$: Subject<boolean> = new Subject<boolean>();
  overlay$: Observable<boolean> = this._overlay$.asObservable();

  private _routerSubscription: Subscription;
  private _overlaySubscription: Subscription;

  constructor(
    private _router: Router,
    private _newsService: NewsService,
    private _applicationRef: ApplicationRef,
    private _changeDetectorRef: ChangeDetectorRef
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

    this._overlaySubscription = combineLatest([
      this._router.events.pipe(filter((e) => e instanceof NavigationStart || e instanceof NavigationEnd)),
      this._applicationRef.isStable]
    ).subscribe(([e, stable]) => {
      if (e instanceof NavigationStart) {
        this._overlay$.next(true);
      }

      if (e instanceof NavigationEnd && stable) {
        this._overlay$.next(false);
        this._changeDetectorRef.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }
    if (this._overlaySubscription) {
      this._overlaySubscription.unsubscribe();
    }
  }

  loadMore(): void {
    this._newsService.loadMoreNews();
  }

  hasClickedLink(param: string): void {
    switch (param) {
      case 'new':
        if (this.newIsActive) {
          this._router.navigateByUrl('');
          this.newIsActive = false;
        }
        break;
      case 'best':
        if (this.bestIsActive) {
          this._router.navigateByUrl('');
          this.bestIsActive = false;
        }
        break;
      default:
        break;
    }
  }

}
