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
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { ArrayAllergies, UserDetailsInterface } from '../../interfaces/user-details-interface';
import { MatButtonModule } from '@angular/material/button';
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
  listAllergies: Array<ArrayAllergies> = [];
  userDetails: UserDetailsInterface | undefined;
  userAllergies: ArrayAllergies[] = [];
  formAllergy!: FormGroup;
  formWeightHeight!: FormGroup;
  constructor(
    private userpanelService: UserpanelService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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
    this.loadUserDetails();
  }
  private loadListAllergies() {
    this.userpanelService.getListAllergies().subscribe({
      next: (response) => {
        this.listAllergies = response;
        this.addCheckboxes();
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
  }
  get allergyFormArray() {
    return this.formAllergy.controls['allergyIds'] as FormArray;
  }
 private addCheckboxes() {
    this.listAllergies.forEach(() =>
      this.allergyFormArray.push(new FormControl(false))
    );
  }
  putUserAllergies(selectedAllergyIds: Array<number>) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.userpanelService
        .putUserAllergies(selectedAllergyIds, id)
        .subscribe(() => {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.loadUserDetails();
          }, 2000);
        });
    });
  }
  loadUserDetails() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.userpanelService.getUserDetails(id).subscribe({
        next: (response) => {
          this.userDetails = response.userDetails;
          this.userAllergies = response.userAllergies;
        },
        error: (error) => {
          console.error('Error', error);
        },
      });
    });
  }
  submitWeightHeight() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const bodyweight = this.formWeightHeight.get('bodyweightInput')?.value;
      const height = this.formWeightHeight.get('heightInput')?.value;
      const selectedAllergyIds = this.userAllergies.map(
        (allergy) => allergy.id
      );
      this.userpanelService
        .putUserWeightLength(bodyweight * 1000, height, selectedAllergyIds, id)
        .subscribe(() => {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.loadUserDetails();
          }, 2000);
        });
    });
  }
  submitAllergyIds() {
    const selectedAllergyIds = this.formAllergy.value.allergyIds
      .map((checked: boolean, i: number) =>
        checked ? this.listAllergies[i].id : null
      )
      .filter((v: boolean) => v != null);
    this.putUserAllergies(selectedAllergyIds);
  }
}
