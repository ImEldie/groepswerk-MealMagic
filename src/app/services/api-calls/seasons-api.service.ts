import { Injectable } from '@angular/core';
import { DishSeason } from '../../interfaces/interfaces-seasons';
import { ApiRequestsService } from '../functions/api-requests-service/api-requests.service';

@Injectable({
  providedIn: 'root',
})
export class SeasonsApiService {
  private seasons: Array<DishSeason> = [];

  constructor(
    private api: ApiRequestsService
  ) {}

  loadSeasonsFromApi() {
    this.api.get('seasons')
      .subscribe((seasons: Array<DishSeason>) => {
        this.seasons = seasons;
      });
  }

  getseasonsList(): Array<DishSeason> {
    return this.seasons;
  }
}
