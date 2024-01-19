import { Injectable } from '@angular/core';
import { DishStep, Step } from '../../interfaces/interfaces-steps';
import { Observable } from 'rxjs';
import { ApiRequestsService } from '../functions/api-requests-service/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class StepsApiService {
  constructor(
    private api: ApiRequestsService
  ) {
  }

  postDishSteps(stepsToPost: Array<DishStep>): Array<Observable<Step>> {
    const postedSteps: Array<Observable<Step>> = stepsToPost
      .map(step =>
        this.api.post("/steps/", step
        ));

    return postedSteps;
  }
}
