import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- intentionally an attribute selector, applied to existing host elements
  selector: '[appNavItem]',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    '[class.active]': 'active()'
  }
})
export class NavItemComponent {
  readonly active = input(false);
}
