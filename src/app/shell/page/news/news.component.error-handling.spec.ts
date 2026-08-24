import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DataProviderService } from '../../../services/data-provider.service';
import { NewsService } from '../../../services/news.service';
import { CardComponent } from '../../ui-components/card/card.component';
import { NewsComponent } from './news.component';

describe('NewsComponent error handling', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let loadingCalls: boolean[];

  beforeEach(async () => {
    loadingCalls = [];
    const mockDataProviderService: Partial<DataProviderService> = {
      getData: () => throwError(() => new Error('network error'))
    };
    const mockActivatedRoute: Partial<ActivatedRoute> = {
      params: of({ type: 'new' })
    };
    const mockNewsService: Partial<NewsService> = {
      loadMore$: of(),
      loading: (state: boolean) => { loadingCalls.push(state); }
    };

    await TestBed.configureTestingModule({
      declarations: [ NewsComponent, CardComponent],
      providers: [
        { provide: DataProviderService, useValue: mockDataProviderService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: NewsService, useValue: mockNewsService }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should clear the loading state when the news fetch fails, instead of hanging', () => {
    expect(loadingCalls).toContain(false);
    expect(component.newsItems).toEqual([]);
  });
});
