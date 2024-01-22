import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Fridges, IngredientInfo, UserDetails, Ingredient, Ingredients, Fridge } from '../../interfaces/fridge-interface';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class FridgeService {


apiUrl = "https://syntra2023.code-coaching.dev/api/group-2/";
token = this.auth.getBearerToken();

 constructor(
  private http: HttpClient,
  public auth: AuthService
  ) { }

  public addIngredients: number | null = null  ;
  public ingredientName: string = '';
  


  setAddIngredients (name: string, id: number | null): void {
    this.addIngredients = id;
    this.ingredientName = name;
  }

  getAddIngredients(): { name: string, id: number | null } {
    return { name: this.ingredientName, id: this.addIngredients };
  }

  loadIngredients(): Observable<Array<{ id: number, name: string }>> {
    
    return this.http.get<IngredientInfo>(`${this.apiUrl}ingredients`, {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    })
    .pipe(map((data) => {
      return data.data.map((ingredient) =>  ({ id: ingredient.id, name: ingredient.name }));
  }))
  }
 
 getIngredientDetails(id: number): Observable<Ingredient> {
  return this.http.get<Ingredient>(`${this.apiUrl}ingredients/${id}`, {
    headers: {
      Authorization: "Bearer " + this.token,
    },
  })
  .pipe(map
    ((data) => {
       const ingredientInfo: Ingredient = { 
             id: data.id,
             name: data.name,
             kcal: data.kcal,
             protein: data.protein,
             carbohydrates: data.carbohydrates,
             fat: data.fat,
             allergy_ids: data.allergy_ids,
           };
         return  ingredientInfo 
        })
    );
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

 postIngredientsFridge(
  fridgeId: number,
  ingredientId: number,
  amount: number): Observable <Ingredients> {
  
  console.log('attempting to post: ', amount, fridgeId);

  return this.http
    .post< Ingredients >(`${this.apiUrl}ingredients-fridges`, 
      {
        fridge_id: fridgeId,
        ingredient_id: ingredientId,
        amount: amount,
      }, 
      {
        headers: {
        Authorization: "Bearer " + this.token,
      }})
  /*  .subscribe((data)=> {
      const ingredientsFridgeId = data.id;
      return ingredientsFridgeId;
    }); */
    
}

putAmount(
  id: number,
  fridgeId: number,
  ingredientId: number,
  amount: number
  ){
  console.log('attempting to put: ', amount);
  this.http
    .put<{amount: number}>(`${this.apiUrl}ingredients-fridges/${id}`, 
      {
       fridge_id: fridgeId,
       ingredient_id: ingredientId,
       amount: amount,
      }, 
      {
        headers: {
          Authorization: "Bearer " + this.token,
        }
      })
       .subscribe((data)=> console.log(data));
}
/*
getIngredientsFridgeId(){
  return this.http.get<IngredientInfo>(`${this.apiUrl}ingredients`, {
    headers: {
      Authorization: "Bearer " + this.token,
    },
  })
  .pipe(map((data) => {
    return data.data.map((ingredient) =>
  ingredient.id,);
}))
}
*/
deleteIngredientsFridge(id: number) {
  this.http.delete(`${this.apiUrl}ingredients-fridges/${id}`,
  {
    headers: {
      Authorization: "Bearer " + this.token,
    }
  })
  .subscribe();
}

testLog() {
  this.getIngredientDetails(2).subscribe(
    {next: (response) => {
    console.log(response.name);
  }}
  )
}


getFridgeIdFromFridges(id: number) {
  return this.http
    .get<Fridges>(`${this.apiUrl}fridges`, {
      headers: {
        Authorization: "Bearer " + this.token,
      }
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

getIngredientIdsInFridge(fridgeId: number){
  return this.http.get<Fridge>(`${this.apiUrl}fridges/${fridgeId}`,
  {
    headers: {
      Authorization: "Bearer " + this.token,
    }
  })
  .pipe(
    map((data) => {
     return data.ingredients?.map((ingredients) => {
      const ingredientsFridgeInfo: Ingredients = {
        id: ingredients.id,
        fridge_id: ingredients.fridge_id,
        ingredient_id: ingredients.ingredient_id,
        amount: ingredients.amount,
      };
      return ingredientsFridgeInfo
    })
  },))
}

getIngredientsFridgesDetails(ingredientFridgesId: number){
  return this.http.get<Ingredients>(`${this.apiUrl}ingredients-fridges/${ingredientFridgesId}`,
  {
    headers: {
      Authorization: "Bearer " + this.token,
    }
  })
  .pipe(
    map((data) => {
      const ingredientFridgeInfo: 
      Ingredients = {
        id: data.id,
        fridge_id: data.fridge_id,
        ingredient_id: data.ingredient_id,
        amount: data.amount,
      };
      return ingredientFridgeInfo
    })
  )}
}

