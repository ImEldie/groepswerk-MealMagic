import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap } from 'rxjs';
import {
  Fridge,
  FridgeIngredient,
  FridgeRespone,
  FridgeFromUser,
} from '../../interfaces/fridge-interface';
import { LocalstorageService } from '../functions/localstorage.service';
@Injectable({
  providedIn: 'root',
})
export class FridgeService {
  constructor(
    private http: HttpClient,
    private storage: LocalstorageService,
  ) {}
  getFridgeIdFromFridges(): Observable<Fridge | null> {
    return this.http.get<FridgeRespone>('fridges/').pipe(
      map((response) => {
        let fridge = response.data.find(
          (object) => object.user_detail_id === this.storage.userId.get(),
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
            .get<FridgeFromUser>('fridges/' + fridge.id)
            .pipe(map((response) => response.ingredients));
        } else {
          return of([]);
        }
      }),
    );
  }
}
