import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { DishSeason, SeasonsApiResponse } from '../../components/interfaces/interfaces-seasons';

@Injectable({
  providedIn: 'root'
})

export class SeasonsApiService {
  private seasons: Array<DishSeason> = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.loadSeasonsFromApi();
  }

  loadSeasonsFromApi(): void{
    const targetLink = "https://syntra2023.code-coaching.dev/api/group-2/seasons/";
    const token = this.auth.getBearerToken();

    this.http
      .get<SeasonsApiResponse>(targetLink, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map((data: SeasonsApiResponse) => data.data))
      .subscribe((dishes: DishSeason[]) => {
        this.seasons = dishes;
      });
  }

  getseasonsList(): Array<DishSeason>{
    return this.seasons;
  }
}
