import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../../services/weather.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherForm!: FormGroup;
  cityList: any[] = [];

  constructor(private weatherService: WeatherService) {
  }

  createWeatherForm(item?: any) {
    item = item || {};
    this.weatherForm = new FormGroup({
      cities: new FormControl(
        {value: item.cities ? item.cities : ''}, {validators: [Validators.required]})
    });


  }

  ngOnInit() {
    this.weatherService.getAll().subscribe((weather: any): any => {
      console.log(weather['data']);
      this.cityList = weather['data'];
    })
  };

  onSubmit() {
    console.log(this.weatherForm);
  }
}
