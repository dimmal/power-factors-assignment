import { Character } from "../models/character";
import { PaginationInfo } from "../models/pagination-info";

export interface GetAllCharactersResponse {
  info: PaginationInfo;
  data: Array<Character>
}
