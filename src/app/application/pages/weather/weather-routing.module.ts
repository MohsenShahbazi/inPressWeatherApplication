import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WeatherComponent} from "./weather/weather.component";
import {ShowWeatherComponent} from "./show-weather/show-weather.component";

const routes: Routes = [

  {path: '', component: WeatherComponent},
  {path: 'showWeather', component: ShowWeatherComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule {
}
