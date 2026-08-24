import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- intentionally an attribute selector, applied to existing host elements
  selector: '[appButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ButtonComponent {

}
