import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../../services/weather.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CityService} from "../../../services/city.service";
import {Router} from "@angular/router";

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
    private cityService: CityService,
    private weatherService: WeatherService,
    private fb: FormBuilder,
    private router: Router,
  ) {
  }


  ngOnInit() {
    this.createWeatherForm();
    this.cityService.getAll().subscribe((info: any): any => {
      this.cityList = info['data'];
    })
  };

  onSubmit() {
    this.weatherService.weatherData$.next(this.weatherForm.controls['cities'].value);
    this.router.navigate(['weather/showWeather']);
  }

  createWeatherForm() {
    this.weatherForm = this.fb.group({
      cities: ['', Validators.required]
    });
  }
}
