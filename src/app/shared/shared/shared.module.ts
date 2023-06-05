import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrModule} from "ngx-toastr";
import {AuthGuard} from "../../structure/auth-guard.service";
import {RouterModule} from "@angular/router";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
  ],
  exports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TranslateModule,
    ToastrModule
  ],
  providers: [AuthGuard]
})
export class SharedModule {

  constructor(public translate: TranslateService) {
    this.translate.addLangs(['en', 'fa']);
    this.translate.setDefaultLang('fa');
    this.translate.use('fa');
  }
}
