import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../../services/weather.service";

@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.scss']
})
export class ShowWeatherComponent implements OnInit {

  weatherDataSubject: any;
  weatherInformation!: any;

  constructor(private weatherService: WeatherService) {

  }

  ngOnInit(): void {
    this.weatherService.weatherData$.subscribe(info => {
      this.weatherDataSubject = info;
      this.getWeather();
    })
  }

  getWeather() {
    this.weatherService.getAllWeather(this.weatherDataSubject.latitude,
      this.weatherDataSubject.longitude).subscribe((info: any) => {
      this.weatherInformation = info;
      console.log(this.weatherInformation);
    })
  }


}
