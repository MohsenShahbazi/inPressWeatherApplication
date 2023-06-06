// import {Actions, Effect, ofType} from '@ngrx/effects';
// import {catchError, debounceTime, map, skip, switchMap, takeUntil} from 'rxjs/operators';
// import {Action} from '@ngrx/store';
// import {Inject, Injectable, Optional} from "@angular/core";
// import {WeatherService} from "../../application/services/weather.service";
// import {asyncScheduler, Observable, of} from "rxjs";
// import {Search, WeatherActionType} from "../actions/weather.actionType";
// import {SearchComplete, SearchError} from "../actions/weather.actionType";
//
// @Injectable()
// export class ProductEffects {
//
//   constructor(
//     private actions$: Actions,
//     private productService: WeatherService,
//     @Optional()
//     @Inject(SEARCH_DEBOUNCE)
//     private debounce: number,
//     @Optional()
//     @Inject(SEARCH_SCHEDULER)
//     private scheduler: Scheduler
//   ) {
//   }
//
//   @Effect()
//   search$: Observable<Action> = this.actions$.pipe(
//     ofType<Search>(WeatherActionType.Search),
//     debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
//     map(action => action.payload),
//     switchMap(query => {
//       if (query === undefined || query === null) {
//         return empty();
//       }
//       const nextSearch$ = this.actions$.pipe(
//         ofType(WeatherActionType.Search),
//         skip(1)
//       );
//       return this.productService.get(query).pipe(takeUntil(nextSearch$),
//         map((weather: any[]) => new SearchComplete(weather)),
//         catchError(err => of(new SearchError(err)))
//       )
//     })
//   );
// }
