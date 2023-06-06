import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AboutRoutingModule} from "./about-routing.module";
import {AboutComponent} from "./about/about.component";


@NgModule({
  declarations: [AboutComponent],
  imports: [
    AboutRoutingModule,
    CommonModule
  ]
})
export class AboutModule {
}
