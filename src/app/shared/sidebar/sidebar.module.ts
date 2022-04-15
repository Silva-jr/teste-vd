import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [SidebarComponent, MatIconModule],
  providers: [
    /*   {
      multi: true,
      provide: EVENT_MANAGER_PLUGINS,
      useClass: Plugin
    } */
  ],
})
export class SidebarModule {}
