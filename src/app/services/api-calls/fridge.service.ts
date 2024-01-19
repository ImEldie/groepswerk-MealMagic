import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
  getFridgeIngredients(id: number): Observable<FridgeIngredient[]> {
    return this.http
      .get<FridgeIngredientResponse>(`${this.apiUrlFridgeIngredients}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      })
      .pipe(
        map((response) => {
          console.log(response);
          return response.data.filter((point) => point.fridge_id === id);
        }),
      );
  }
  //JASPER
  getFridgeIdFromFridges(id: number) {
    return this.http
      .get<FridgeRespone>(`${this.apiUrlFridge}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.auth.getBearerToken(),
        }),
      })
      .pipe(
        map((response) => {
          console.log(response);
          let fridge = response.data.find(
            (object) => object.user_detail_id === id,
          );
          return fridge ? fridge.id : null;
        }),
      );
  }
}
