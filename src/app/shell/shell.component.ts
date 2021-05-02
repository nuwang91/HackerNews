import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {

  newIsActive: boolean = false;
  bestIsActive: boolean = false;

  private _routerSubscription: Subscription;

  constructor(private router: Router) {

    this._routerSubscription = this.router.events
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

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }
  }

  loadMore(): void {
    //
  }

}
