import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DataProviderService } from '../../../services/data-provider.service';
import { NewsService } from '../../../services/news.service';
import { CardComponent } from '../../ui-components/card/card.component';
import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  const mockDataProviderService: Partial<DataProviderService> = {};
  const mockActivatedRoute: Partial<ActivatedRoute> = {
    params: of()
  };
  const mockNewsService: Partial<NewsService> = {
    loadMore$: of()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsComponent, CardComponent],
      providers: [
        { provide: DataProviderService, useValue: mockDataProviderService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: NewsService, useValue: mockNewsService }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
