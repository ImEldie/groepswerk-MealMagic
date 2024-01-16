import { Injectable } from '@angular/core';
import { DishStep } from '../../interfaces/interfaces-steps';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepsApiService {

  lastStepsPosted: Array<DishStep> = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
  }

  postSteps(stepsToPost: Array<DishStep>){
    const targetLink: string = "https://syntra2023.code-coaching.dev/api/group-2/steps/";
    const token = this.auth.getBearerToken();

    console.log('attempting to post: ', stepsToPost);

    this.http
      .post<{postedSteps: string}>(targetLink, stepsToPost, {headers: new HttpHeaders({Authorization: "Bearer " + token})})
      .pipe(
        tap((data) => {
          console.log('intercepted data:', data);
        })
      );
  }
}
