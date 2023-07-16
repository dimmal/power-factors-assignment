export interface Character {
  _id: number;
  films: Array<string>;
  shortFilms: Array<string>;
  tvShows: Array<string>;
  videoGames: Array<string>;
  parkAttractions: Array<string>;
  allies: Array<string>;
  enemies: Array<string>;
  sourceUrl: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  __v: number;
}
