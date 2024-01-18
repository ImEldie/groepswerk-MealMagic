import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import {
  DishSeason,
  SeasonsApiResponse,
} from '../../interfaces/interfaces-seasons';

@Injectable({
  providedIn: 'root',
})
export class SeasonsApiService {
  private seasons: Array<DishSeason> = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  loadSeasonsFromApi() {
    const targetLink =
      'https://syntra2023.code-coaching.dev/api/group-2/seasons/';

    this.http
      .get<SeasonsApiResponse>(targetLink, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((response) => response.data))
      .subscribe((seasons: Array<DishSeason>) => {
        this.seasons = seasons;
      });
  }

  getseasonsList(): Array<DishSeason> {
    return this.seasons;
  }
}
