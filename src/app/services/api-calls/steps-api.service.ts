import { Injectable } from '@angular/core';
import { DishStep, Step } from '../../interfaces/interfaces-steps';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepsApiService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
  }

  createPostObservables(stepsToPost: Array<DishStep>): Array<Observable<Step>> {
    const targetLink: string = "https://syntra2023.code-coaching.dev/api/group-2/steps/";
    const token = this.auth.getBearerToken();

    const ObservablesToReturn: Array<Observable<Step>> = stepsToPost.map(step =>
      this.http
      .post<Step>(targetLink, 
        {
          title: step.title,
          description: step.description,
          order: step.order,
          picture: step.picture
        },
        {
          headers: new HttpHeaders(
            { Authorization: "Bearer " + token }
          )
        }
      ));
    return ObservablesToReturn;
  }
}
