import { Injectable } from '@angular/core';
import { DishSeason, SeasonList } from '../../interfaces/interfaces-seasons';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeasonsApiService {
  private seasons: Array<DishSeason> = [];

  constructor(private http: HttpClient) {}

  loadSeasonsFromApi() {
    this.http
      .get<SeasonList>('seasons')
      .pipe(map((d) => d.data))
      .subscribe((seasons) => {
        this.seasons = seasons;
      });
  }

  getseasonsList(): Array<DishSeason> {
    return this.seasons;
  }
}