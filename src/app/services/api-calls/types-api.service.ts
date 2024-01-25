import { Injectable } from '@angular/core';
import { DishType, TypeList } from '../../interfaces/interfaces-types';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypesApiService {
  private types: Array<DishType> = [];

  constructor(
    private http: HttpClient
    ) {};

  loadTypesFromApi() {
    this.http
      .get<TypeList>('types')
      .pipe(map((d) => d.data))
      .subscribe((types) => (this.types = types));
  }

  getTypesList(): Array<DishType> {
    return this.types;
  }
}