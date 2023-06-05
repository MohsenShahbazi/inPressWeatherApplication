import {NgModule, ErrorHandler} from "@angular/core";
import * as Sentry from "@sentry/angular-ivy";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContactComponent} from './application/contact/contact.component';
import {HeaderComponent} from './structure/components/header/header.component';
import {FooterComponent} from './structure/components/footer/footer.component';
import {NotFoundComponent} from './structure/components/not-found/not-found.component';
import {Router} from "@angular/router";
import {SharedModule} from "./shared/shared/shared.module";
import {CookieService} from "ngx-cookie-service";


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(trace: Sentry.TraceService) {
  }
}
