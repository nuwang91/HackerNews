import { ApplicationRef, ChangeDetectorRef, Component, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivationEnd, NavigationEnd, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NewsService } from '../services/news.service';
import { NavItemComponent } from './ui-components/nav-item/nav-item.component';
import { ButtonComponent } from './ui-components/button/button.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavItemComponent, RouterLink, RouterOutlet, ButtonComponent, AsyncPipe]
})
export class ShellComponent implements OnDestroy {
  private _router = inject(Router);
  private _newsService = inject(NewsService);
  private _applicationRef = inject(ApplicationRef);
  private _changeDetectorRef = inject(ChangeDetectorRef);

  loading$: Observable<boolean> = this._newsService.loading$;
  newIsActive = false;
  bestIsActive = false;

  private _overlay$: Subject<boolean> = new Subject<boolean>();
  overlay$: Observable<boolean> = this._overlay$.asObservable();

  private _routerSubscription: Subscription;
  private _overlaySubscription: Subscription;

  constructor() {

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
        this._changeDetectorRef.markForCheck();
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
