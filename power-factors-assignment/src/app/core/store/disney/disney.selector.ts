import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DisneyState } from "./disney.state";

export const disneyFeature$ = createFeatureSelector<DisneyState>("disney");

export const disney$ = createSelector(
  disneyFeature$,
  (state: DisneyState) => state
);
