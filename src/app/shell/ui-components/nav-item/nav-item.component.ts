import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- intentionally an attribute selector, applied to existing host elements
  selector: '[appNavItem]',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class NavItemComponent {

  @HostBinding('class.active')
  @Input()
  active = false;

}
