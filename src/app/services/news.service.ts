import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _loadMore$: Subject<void> = new Subject<void>();
  public loadMore$: Observable<void> = this._loadMore$.asObservable();


  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public loading$: Observable<boolean> = this._loading$.asObservable();
  
  constructor() { }

  public loadMoreNews(): void {
    this._loadMore$.next();
  }

  public loading(state: boolean): void {
    this._loading$.next(state);
  }

}
