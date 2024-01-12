import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { UserpanelService } from '../../services/api-calls/userpanel.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import {
  ArrayAllergies,
  UserDetailsInterface,
} from '../../interfaces/user-details-interface';
import { MatButtonModule } from '@angular/material/button';
import 'zone.js';
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
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatProgressBarModule,
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
  bodyweightInput: number = NaN;
  heightInput: number = NaN;
  loading: boolean = false;
  @ViewChild(MatAccordion)
  accordion: MatAccordion = new MatAccordion();
  public listAllergies: Array<ArrayAllergies> = [];
  getListAllergies() {
    this.userpanelService.getListAllergies().subscribe({
      next: (response) => {
        this.listAllergies = response;
        console.log(response);
        this.addCheckboxes();
      },
      error: (error) => {
        console.error('Error', error);
      },
    });
  }
  constructor(
    private userpanelService: UserpanelService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.getUserDetails();
    this.getListAllergies();
    this.bodyweightInput = NaN;
    this.heightInput = NaN;
    this.formWeightHeight = this.formBuilder.group({
      bodyweightInput: new FormControl(null),
      heightInput: new FormControl(null),
    });
    this.formAllergy = this.formBuilder.group({
      allergyIds: new FormArray([]),
    });
    this.addCheckboxes();
  }
  formAllergy!: FormGroup;
  formWeightHeight!: FormGroup;

  get allergyFormArray() {
    return this.formAllergy.controls['allergyIds'] as FormArray;
  }
  addCheckboxes() {
    this.listAllergies.forEach(() =>
      this.allergyFormArray.push(new FormControl(false))
    );
  }
  submitAllergyIds() {
    const selectedAllergyIds = this.formAllergy.value.allergyIds
      .map((checked: boolean, i: number) =>
        checked ? this.listAllergies[i].id : null
      )
      .filter((v: boolean) => v != null);
    console.log(selectedAllergyIds);
    this.postUserAllergies(selectedAllergyIds);
  }
  postUserAllergies(selectedAllergyIds: Array<number>) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.userpanelService
        .postUserAllergies(selectedAllergyIds, id)
        .subscribe(() => {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getUserDetails();
          }, 2000);
        });
    });
  }
  public userdetails: UserDetailsInterface | undefined;
  public listUserAllergies: Array<number> = [];
  getUserDetails() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.userpanelService.getUserDetails(id).subscribe({
        next: (response) => {
          this.userdetails = response;
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
      this.userpanelService
        .postUserWeightLength(bodyweight, height, id)
        .subscribe(() => {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.getUserDetails();
          }, 2000);
        });
    });
  }
}
