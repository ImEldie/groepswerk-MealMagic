import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
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
import {
  Allergy,
  UserDetailsInterface,
  UserDetailsResponse,
} from '../../interfaces/user-details-interface';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AllergyIconComponent } from '../../components/allergy-icon/allergy-icon.component';
import { UserpanelService } from '../../services/api-calls/userpanel.service';
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
    MatTooltipModule,
    AllergyIconComponent,
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
  listAllergies: Array<Allergy> = [];
  userDetails: UserDetailsInterface | undefined;
  userAllergies: Allergy[] = [];
  formAllergy!: FormGroup;
  formWeightHeight!: FormGroup;
  bmiAmount: number = NaN;
  bmiResult: string = '';
  bmiFadeIn: boolean = false;
  bmiFadeOut: boolean = false;
  resetArrow: boolean = false;
  constructor(
    private userpanelService: UserpanelService,
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
    this.userpanelService.putUserAllergies(selectedAllergyIds).subscribe(() => {
      this.loading = true;
      this.loadUserDetails().subscribe({
        next: () => (this.loading = false),
        error: () => (this.loading = false),
      });
    });
  }
  loadUserDetails(): Observable<UserDetailsResponse> {
    return this.userpanelService.getUserDetails().pipe(
      map((response) => {
        this.userDetails = response.userDetails;
        this.userAllergies = response.userAllergies;
        return response;
      }),
    );
  }
  submitWeightHeight() {
    const bodyweight = this.formWeightHeight.get('bodyweightInput')?.value;
    const height = this.formWeightHeight.get('heightInput')?.value;
    const selectedAllergyIds = this.userAllergies.map((allergy) => allergy.id);
    this.userpanelService
      .putUserWeightLength(bodyweight * 1000, height, selectedAllergyIds)
      .subscribe(() => {
        this.loading = true;
        this.bmiFadeOutAnimate();
        this.resetArrow = true;
        this.bmiAmount = NaN;
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
  }
  submitAllergyIds() {
    const selectedAllergyIds = this.formAllergy.value.allergyIds
      .map((checked: boolean, i: number) =>
        checked ? this.listAllergies[i].id : null,
      )
      .filter((v: boolean) => v != null);
    this.putUserAllergies(selectedAllergyIds);
  }
  createBmiMeter() {
    this.resetArrow = false;
    this.bmiFadeInAnimate();
    this.calculateBmi();
    this.resultBmi();
  }
  private calculateBmi(): number {
    if (this.userDetails?.bodyweight && this.userDetails?.height) {
      this.bmiAmount =
        this.userDetails.bodyweight /
        ((this.userDetails.height / 100) * (this.userDetails.height / 100));
    }
    return this.bmiAmount;
  }
  private resultBmi(): string {
    if (this.bmiAmount < 18.5) {
      this.bmiResult = 'Underweight';
    } else if (18.5 <= this.bmiAmount && this.bmiAmount <= 24.9) {
      this.bmiResult = 'Healthy';
    } else if (25 <= this.bmiAmount && this.bmiAmount <= 29.9) {
      this.bmiResult = 'Overweight';
    } else if (30 <= this.bmiAmount && this.bmiAmount <= 34.9) {
      this.bmiResult = 'Obese';
    } else if (35 <= this.bmiAmount) {
      this.bmiResult = 'Extremely obese';
    }
    return this.bmiResult;
  }
  private bmiFadeInAnimate() {
    this.bmiFadeOut = false;
    this.bmiFadeIn = true;
  }
  private bmiFadeOutAnimate() {
    this.bmiFadeOut = true;
    this.bmiFadeIn = false;
  }
  maxKeyframesBmi(bmiAmount: number) {
    const maxBmiAmount = 45;
    const limitedBmiAmount = Math.min(bmiAmount, maxBmiAmount);
    return limitedBmiAmount;
  }
  isDisabled(): boolean {
    return !(this.userDetails?.bodyweight && this.userDetails?.height);
  }
}
