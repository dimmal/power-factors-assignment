import { Character } from "../../models/character";
import { PaginationInfo } from "../../models/pagination-info";


export interface DisneyState {
  info?: PaginationInfo,
  characters: Array<Character>
}

export const initialState: DisneyState = {
  characters: []
};
