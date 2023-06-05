import {Component} from '@angular/core';
import {AuthService} from "./structure/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inPressWeatherApplication';


  constructor(private authService: AuthService) {
    this.authService.getResource();
  }
}
