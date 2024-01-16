import { Injectable } from '@angular/core';
import { DishType, TypesApiResponse } from '../../components/interfaces/interfaces-types';
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

  loadTypesFromApi(): void{
    const targetLink = "https://syntra2023.code-coaching.dev/api/group-2/types/";
    const token = this.auth.getBearerToken();

    this.http
      .get<TypesApiResponse>(targetLink, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map((data: TypesApiResponse) => data.data))
      .subscribe((dishes: DishType[]) => {
        this.types = dishes;
      });
  }

  getTypesList(): Array<DishType>{
    return this.types;
  }
}
