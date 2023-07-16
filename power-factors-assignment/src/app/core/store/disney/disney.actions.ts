import { createAction, props } from "@ngrx/store";
import { PaginationInfo } from "../../models/pagination-info";
import { Character } from "../../models/character";

const prefix = '[Disney]';

export const getCharacters = createAction(`${prefix} get all characters`, props<{ page: number; pageSize: number; name?: string, tvShows?: string }>());
export const getCharactersSuccess = createAction(`${prefix} get all characters success`, props<{ info: PaginationInfo; characters: Array<Character> | Character; }>());
