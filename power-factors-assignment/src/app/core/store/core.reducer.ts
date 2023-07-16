import { Action, ActionReducer, ActionReducerMap } from "@ngrx/store";
import { State } from "./core.state";
import { disneyReducer } from "./disney/disney.reducer";

export const reducers: ActionReducerMap<State> = {
  disney: disneyReducer
};
