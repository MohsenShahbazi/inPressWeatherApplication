import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherComponent} from './weather/weather.component';
import {WeatherRoutingModule} from "./weather-routing.module";


@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    WeatherRoutingModule,
    CommonModule
  ]
})
export class WeatherModule {
}
