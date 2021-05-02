import { Component, Input, OnChanges, OnInit, SecurityContext, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

  @Input()
  title: string = '';

  @Input()
  body: string = '';

  @Input()
  time: string = '';

  @Input()
  comment: string = '';
  
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.body) {
      this.body = this.domSanitizer.sanitize(SecurityContext.HTML, this.body) as string;
    }
  }

}
