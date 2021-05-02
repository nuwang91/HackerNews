import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: '[appNavItem]',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @HostBinding('class.active')
  @Input()
  active: boolean =  false;

  constructor() { }

  ngOnInit(): void {
  }

}
