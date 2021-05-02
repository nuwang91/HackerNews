import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { NavItemModule } from './ui-components/nav-item/nav-item.module';
import { ButtonModule } from './ui-components/button/button.module';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    NavItemModule,
    ButtonModule
  ],
  exports: [ShellComponent]
})
export class ShellModule { }
