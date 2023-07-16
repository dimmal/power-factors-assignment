import { Action, createReducer, on } from "@ngrx/store";
import * as reducerActions from "./disney.actions";
import { DisneyState, initialState } from "./disney.state";
import { Character } from "../../models/character";

const reducer = createReducer(
  initialState,
  on(reducerActions.getCharactersSuccess, (state, { info, characters }) => {
    let data: Array<Character>;

    if (characters instanceof Array) {
      data = characters;
    } else {
      data = [characters];
    }

    const newCharactersState = data?.map(char => { return {
      ...char,
      filmsNo: char.films.length
    }});

    return ({
      ...state,
      info,
      characters: newCharactersState || []
    });
  })
);

export function disneyReducer(state: DisneyState| undefined, action: Action) {
  return reducer(state, action);
}
