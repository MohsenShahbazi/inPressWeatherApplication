import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWeatherComponent } from './show-weather.component';

describe('ShowWeatherComponent', () => {
  let component: ShowWeatherComponent;
  let fixture: ComponentFixture<ShowWeatherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowWeatherComponent]
    });
    fixture = TestBed.createComponent(ShowWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set data and call  method when ngOnInit called', () => {

    spyOn(component, 'getWeather');

    component.ngOnInit();

    expect(component.caregiver).toEqual(mockCaregiver);
    expect(component.getCaregiverLov).toHaveBeenCalled();
    expect(component.clientForm.value.clientCodes).toEqual(mockCaregiver.clients);
  });
});
