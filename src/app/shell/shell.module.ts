import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { NavItemModule } from './ui-components/nav-item/nav-item.module';
import { ButtonModule } from './ui-components/button/button.module';
import { NewsModule } from './page/news/news.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    NavItemModule,
    ButtonModule,
    NewsModule,
    AppRoutingModule
  ],
  exports: [ShellComponent]
})
export class ShellModule { }
