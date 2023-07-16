import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, take } from "rxjs/operators";
import { HttpDisneyService } from "../../services/http-disney.service";
import * as disneyActions from "./disney.actions";

@Injectable()
export class DisneyEffects {
  constructor(
    private actions$: Actions<any>,
    private httpDisney: HttpDisneyService) { }

  getCharacters$ = createEffect(() => {

    return this.actions$.pipe(
      ofType(disneyActions.getCharacters.type),
      switchMap((action) => {
        return this.httpDisney.getAllCharacters(action.page, action.pageSize, action.name, action.tvShows).pipe(
          take(1),
          map((response) => disneyActions.getCharactersSuccess({ info: response.info, characters: response.data })
          )
        )
      })
    )
  });

}
