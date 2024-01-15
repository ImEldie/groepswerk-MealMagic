import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { Fridges, IngredientInfo, UserDetails, Ingredient, FridgeIngredients } from '../../components/custom-component/custom-component.component';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {
apiUrl = "https://syntra2023.code-coaching.dev/api/group-2/";
token = "328|uHBUkP6vz3iVBUVPXbrf0jpXWTdb9snPkWFkdccz0d3aa311";
 constructor(private http: HttpClient) { }

  public addIngredients: string | null = ''  ;



  setAddIngredients (data: string | null): void {
    this.addIngredients = data;
    this.saveIngredients();
  }

  getAddIngredients (): string | null {
    return this.addIngredients;
  }

  private saveIngredients() {
    if (this.addIngredients !== null && this.addIngredients !== '') {
      localStorage.setItem("data", this.addIngredients);
    }
  }

  loadIngredients(): Observable<Array<string>> {
    return this.http.get<IngredientInfo>(`${this.apiUrl}ingredients`, {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    })
    .pipe(map((data) => {
      return data.data.map((ingredient) =>
    ingredient.name,);
  }))
  }
 
 getIngredientName(id: number): Observable<Array<number>> {
  return this.http.get<IngredientInfo>(`${this.apiUrl}ingredients`, {
    headers: {
      Authorization: "Bearer " + this.token,
    },
  })
  .pipe(map((data) => {
    return data.data.map((ingredient) =>
  ingredient.id);
}))
}

 getUserDetails(): Observable<Array<number>> {
  return this.http.get<UserDetails>(`${this.apiUrl}user-details`, {
    headers: {
      Authorization: "Bearer "+ this.token,
    },
  })
  .pipe(map((data) => {
    return data.data.map((details) =>
  details.id);
}))
 }

 getFridge(): Observable<Array<number>> {
  return this.http.get<Fridges>(`${this.apiUrl}fridges`, {
    headers: {
      Authorization: "Bearer "+ this.token,
    },
  })
  .pipe(map((data) => {
    return data.data.map((fridge) =>
  fridge.id);
}))
 }


 postIngredientsFridges(
  id: number,
  fridgeId: number,
  ingredientId: number,
  amount: number,
  ) {
  return this.http.post(`${this.apiUrl}ingredients-fridges`,{
    id: id,
    fridge_id: fridgeId,
    ingredient_id: ingredientId,
    amount: amount
  }, {
    headers: {
      Authorization: "Bearer "+ this.token,
    },
   },
  );
 }
}
