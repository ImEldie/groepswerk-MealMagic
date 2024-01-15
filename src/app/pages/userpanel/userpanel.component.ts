import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { UserpanelService } from '../../services/userpanel-service/userpanel.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import {
  Allergies,
  UserDetailsInterface,
  UserDetailsResponse,
} from '../../interfaces/user-details-interface';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-userpanel',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatChipsModule,
  ],
  templateUrl: './userpanel.component.html',
  styleUrl: './userpanel.component.css',
})
export class UserpanelComponent implements OnInit {
  public step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion();
  loading: boolean = false;
  listAllergies: Array<Allergies> = [];
  userDetails: UserDetailsInterface | undefined;
  userAllergies: Allergies[] = [];
  formAllergy!: FormGroup;
  formWeightHeight!: FormGroup;
  constructor(
    private userpanelService: UserpanelService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit() {
    this.loadListAllergies();
    this.formWeightHeight = this.formBuilder.group({
      bodyweightInput: new FormControl(null),
      heightInput: new FormControl(null),
    });
    this.formAllergy = this.formBuilder.group({
      allergyIds: new FormArray([]),
    });
    this.loadUserDetails().subscribe();
  }
  private loadListAllergies() {
    this.userpanelService.getListAllergies().subscribe((response) => {
      this.listAllergies = response;
      this.addCheckboxes();
    });
  }
  get allergyFormArray() {
    return this.formAllergy.controls['allergyIds'] as FormArray;
  }
  private addCheckboxes() {
    this.listAllergies.forEach(() =>
      this.allergyFormArray.push(new FormControl(false)),
    );
  }
  private putUserAllergies(selectedAllergyIds: Array<number>) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.userpanelService
        .putUserAllergies(selectedAllergyIds, id)
        .subscribe(() => {
          this.loading = true;
          this.loadUserDetails().subscribe({
            next: () => {
              this.loading = false;
            },
            error: () => {
              this.loading = false;
            },
          });
        });
    });
  }
  loadUserDetails(): Observable<UserDetailsResponse> {
    return this.route.params.pipe(
      switchMap((params) => {
        const id = params['id'];
        return this.userpanelService.getUserDetails(id).pipe(
          map((response) => {
            this.userDetails = response.userDetails;
            this.userAllergies = response.userAllergies;
            return response;
          }),
        );
      }),
    );
  }
  submitWeightHeight() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const bodyweight = this.formWeightHeight.get('bodyweightInput')?.value;
      const height = this.formWeightHeight.get('heightInput')?.value;
      const selectedAllergyIds = this.userAllergies.map(
        (allergy) => allergy.id,
      );
      this.userpanelService
        .putUserWeightLength(bodyweight * 1000, height, selectedAllergyIds, id)
        .subscribe(() => {
          this.loading = true;
          this.loadUserDetails().subscribe({
            next: () => {
              this.loading = false;
            },
            error: (error) => {
              console.error('Error', error);
              this.loading = false;
            },
          });
        });
    });
  }
  submitAllergyIds() {
    const selectedAllergyIds = this.formAllergy.value.allergyIds
      .map((checked: boolean, i: number) =>
        checked ? this.listAllergies[i].id : null,
      )
      .filter((v: boolean) => v != null);
    this.putUserAllergies(selectedAllergyIds);
  }
}
