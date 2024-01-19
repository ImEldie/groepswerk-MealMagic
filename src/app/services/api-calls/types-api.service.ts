import { Injectable } from '@angular/core';
import { DishType, TypesApiResponse } from '../../interfaces/interfaces-types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TypesApiService {
  private types: Array<DishType> = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.loadTypesFromApi();
  }

  loadTypesFromApi(){
    const targetLink = "https://syntra2023.code-coaching.dev/api/group-2/types/";

    this.http
      .get<TypesApiResponse>(targetLink, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + this.auth.getBearerToken(),
        }),
      })
      .pipe(map((response) => response.data))
      .subscribe((dishes: Array<DishType>) => {
        this.types = dishes;
      });
  }

  getTypesList(): Array<DishType>{
    return this.types;
  }
}
