import { Injectable } from '@angular/core';
import { DishStep, Step } from '../../interfaces/interfaces-steps';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StepsApiService {
  constructor(
    private http: HttpClient
  ) {
  }

  postDishSteps(stepsToPost: Array<DishStep>): Array<Observable<Step>> {
    const postedSteps: Array<Observable<Step>> = stepsToPost
      .map(step =>
        this.http.post<Step>("/steps/", step
        ));

    return postedSteps;
  }
}
