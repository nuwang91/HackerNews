import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: '[appNavItem]',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {

  @HostBinding('class.active')
  @Input()
  active: boolean =  false;

}
