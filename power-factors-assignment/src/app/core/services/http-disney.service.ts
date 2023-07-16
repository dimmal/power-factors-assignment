import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetAllCharactersResponse } from '../contracts/get-all-characters';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpDisneyService {

  constructor(private http: HttpClient) { }

  getAllCharacters(page: number, pageSize: number, name?: string, tvShows?: string): Observable<GetAllCharactersResponse> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('pageSize', pageSize);

    if (!!name) {
      params = params.append('name', name);
    }
    if (!!tvShows) {
      params = params.append('tvShows', tvShows);
    }

    return this.http.get<GetAllCharactersResponse>('https://api.disneyapi.dev/character', { params });
  }
}
