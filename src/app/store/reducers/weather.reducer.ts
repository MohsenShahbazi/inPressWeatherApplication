// import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
//
// export interface State extends EntityState<any> {
//   selectedWeatherId: string | null;
// }
//
// export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
//   selectId: (weather: any) => weather.id,
//   sortComparer: false,
// });
//
// export const initialState: State = adapter.getInitialState({
//   selectedProductId: null,
// });
//
// export function reducer(state = initialState, action: weatherActionsUnion): State {
//   switch (action.type) {
//     case WeatherActionsTypes.SearchComplete:
//     default: {
//       return state;
//     }
//   }
// }
