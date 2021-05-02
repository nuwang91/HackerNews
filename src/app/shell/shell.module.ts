import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { NavItemModule } from './ui-components/nav-item/nav-item.module';

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    NavItemModule
  ],
  exports: [ShellComponent]
})
export class ShellModule { }
