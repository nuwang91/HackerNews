import { Component, Input, OnChanges, SecurityContext, SimpleChanges, ChangeDetectionStrategy, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CardComponent implements OnChanges {
  private _domSanitizer = inject(DomSanitizer);

  @Input()
  title = '';

  @Input()
  body = '';

  @Input()
  time = '';

  @Input()
  comment = '';

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.body) {
      this.body = this._domSanitizer.sanitize(SecurityContext.HTML, this.body) as string;
    }
  }

}
