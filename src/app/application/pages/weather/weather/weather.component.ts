import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../../services/weather.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherForm!: FormGroup;
  cityList!: any;
  name: any;

  constructor(
    private weatherService: WeatherService,
    private fb: FormBuilder
  ) {
  }

  createWeatherForm(item?: any) {
    item = item || {};
    /*this.weatherForm = this.fb.group({
      cities: new FormControl(""),
    });*/

    this.weatherForm = new FormGroup({
      cities: new FormControl()
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
