import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import {
  Fridge,
  FridgeIngredient,
  FridgeIngredientResponse,
  FridgeRespone,
} from '../../interfaces/fridge-interface';
@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}
  private apiUrlFridge: string =
    'https://syntra2023.code-coaching.dev/api/group-2/fridges/';
  private apiUrlFridgeIngredients: string =
    'https://syntra2023.code-coaching.dev/api/group-2/ingredients-fridges';
  getFridgeIdFromFridges(): Observable<Fridge | null> {
    return this.http
      .get<FridgeRespone>(`${this.apiUrlFridge}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      })
      .pipe(
        map((response) => {
          let fridge = response.data.find(
            (object) => object.user_detail_id === this.auth.getStoredId(),
          );
          return fridge ? fridge : null;
        }),
      );
  }
  getFridgeIngredients(): Observable<Array<FridgeIngredient>> {
    return this.getFridgeIdFromFridges().pipe(
      switchMap((fridge) => {
        if (fridge !== null) {
          return this.http
            .get<FridgeIngredientResponse>(`${this.apiUrlFridgeIngredients}`, {
              headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.auth.getBearerToken(),
              }),
            })
            .pipe(
              map((response) =>
                response.data.filter((point) => point.fridge_id === fridge.id),
              ),
            );
        } else {
          return of([]);
        }
      }),
    );
  }
}
