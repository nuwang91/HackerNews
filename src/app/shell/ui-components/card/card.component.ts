import { Component, SecurityContext, ChangeDetectionStrategy, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager
})
export class CardComponent {
  private _domSanitizer = inject(DomSanitizer);

  readonly title = input('');
  readonly body = input('');
  readonly time = input('');
  readonly comment = input('');

  readonly sanitizedBody = computed(() => this._domSanitizer.sanitize(SecurityContext.HTML, this.body()) as string);
}
