import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WeatherComponent} from './weather/weather.component';
import {WeatherRoutingModule} from "./weather-routing.module";
import {MatSelectModule} from "@angular/material/select";
import {ShowWeatherComponent} from './show-weather/show-weather.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    WeatherComponent,
    ShowWeatherComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    WeatherRoutingModule,
    CommonModule,
    MatSelectModule,
    TranslateModule,
    //StoreModule.forFeature('weather', {}),
  ]
})
export class WeatherModule {
}
