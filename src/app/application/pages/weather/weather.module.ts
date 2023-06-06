import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherComponent} from './weather/weather.component';
import {WeatherRoutingModule} from "./weather-routing.module";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    WeatherComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    WeatherRoutingModule,
    CommonModule,
    MatSelectModule
  ]
})
export class WeatherModule {
}
