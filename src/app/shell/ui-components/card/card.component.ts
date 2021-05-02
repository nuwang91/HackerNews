import { Component, Input, OnChanges, SecurityContext, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges {

  @Input()
  title: string = '';

  @Input()
  body: string = '';

  @Input()
  time: string = '';

  @Input()
  comment: string = '';
  
  constructor(private _domSanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.body) {
      this.body = this._domSanitizer.sanitize(SecurityContext.HTML, this.body) as string;
    }
  }

}
