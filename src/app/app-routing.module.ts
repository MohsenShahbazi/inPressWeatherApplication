import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactComponent} from "./application/pages/contact/contact.component";
import {NotFoundComponent} from "./structure/components/not-found/not-found.component";

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./application/pages/home/home.module').then(m => m.HomeModule),
    title: 'Home Page'
  },
  {
    path: 'about',
    loadChildren: () => import('./application/pages/about/about.module').then(m => m.AboutModule),
    title: 'About Page'
  }, {
    path: 'weather',
    loadChildren: () => import('./application/pages/weather/weather.module').then(m => m.WeatherModule),
    title: 'Weather Page'
  },
  {path: 'contact', component: ContactComponent},
  {path: '404', component: NotFoundComponent, title: 'Page Not Found'},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
