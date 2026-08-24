import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShellComponent } from './shell/shell.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ShellComponent]
})
export class AppComponent {
  title = 'nas-hacker';
}
