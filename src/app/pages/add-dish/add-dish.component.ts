import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AddDishFormData, DishPostData, IngredientPostData } from '../../interfaces/interfaces-dishes';
import { IngredientsApiService } from '../../services/api-calls/ingredients-api.service';
import { Ingredient } from '../../interfaces/interfaces-ingredients';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { TypesApiService } from '../../services/api-calls/types-api.service';
import { SeasonsApiService } from '../../services/api-calls/seasons-api.service';
import { DishStep } from '../../interfaces/interfaces-steps';
import { DishesApiService } from '../../services/api-calls/dishes-api.service';
import { DishType } from '../../interfaces/interfaces-types';

@Component({
  selector: 'app-add-dish',
  standalone: true,
  imports: [MatIconModule ,MatChipsModule ,MatCardModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatTableModule, FormsModule, MatButtonToggleModule, ReactiveFormsModule, MatExpansionModule],
  templateUrl: './add-dish.component.html',
  styleUrl: './add-dish.component.css'
})

export class AddDishComponent {
  /* ### GLOBAL ### */
  sessionStorageToken = 'new-dish';

  constructor(
    private ingredientsApi: IngredientsApiService,
    private typesApi: TypesApiService,
    private seasonsApi: SeasonsApiService,
    private dishApi: DishesApiService
  ){
    this.ngOnInit();
  }

  ngOnInit(){
    this.getAllApiData();
    this.loadUserInputs();
  }

  private getAllApiData(){
    // Load all API-data
    this.typesApi.loadTypesFromApi();
    this.seasonsApi.loadSeasonsFromApi();
    this.ingredientsApi.loadIngredientsFromAPI();

    // Set data
    setTimeout(() => {
      this.types = this.typesApi.getTypesList();
      this.seasons = this.seasonsApi.getseasonsList().map(season => season.name);
      this.ingredients = this.ingredientsApi.getIngredientList();
    }, 1000);
  }

  allUserInputsValid(): boolean { // WIP
    const ingredientsSelected: boolean = (this.selectedIngredients.length > 0);
    const typesSelected: boolean = (this.selectedTypes.length > 0);
    const stepsCreated: boolean = (this.createdSteps.length > 0);

    console.log(ingredientsSelected, typesSelected, stepsCreated, this.textInputsIsValid(), this.dishDetailsAreValid())
    return ingredientsSelected && typesSelected && stepsCreated && this.textInputsIsValid() && this.dishDetailsAreValid();
  }

  postDish(){
    if (this.allUserInputsValid()) {

      const ingredientIds: Array<number> = this.selectedIngredients.map((ingredient) => ingredient.id);
      const seasonId: number = this.seasonsApi.getSeasonIdFromName(this.seasonFormControl.value);
      const typesIds: Array<number> = this.selectedTypes.map((type) => type.id);

      const postData: DishPostData = {
        name: this.dishNameInput,
        description: this.descriptionInput,
        image_url: this.imageInput,
        duration: this.preparationTimeInput,
        amount_of_people: this.portionSizeInput,
        season_id: seasonId,
        ingredients: ingredientIds,
        dish_types: typesIds,
        dish_steps: [],
      }     

      this.dishApi.postNewDish(postData, this.createdSteps);
    }
  }
  
  clearUserInputs(){
    sessionStorage.removeItem(this.sessionStorageToken);

    this.initialiseUserTextInputs();
    this.initialiseUserIngredientInput();
    this.initialiseUserTypesInput();
    this.initialiseUserStepInput();
    this.initialiseUserDetailsInput();
    this.selectedIngredients = [];
    this.selectedTypes = [];
    this.createdSteps = [];
  }
  private saveUserInputs(){
    const userInputs: AddDishFormData = {
      name: this.dishNameInput, 
      description: this.descriptionInput, 
      image: this.imageInput,
      types: this.selectedTypes,
      season: this.seasonFormControl.value,
      ingredients: this.selectedIngredients,
      steps: this.createdSteps,
      amountOfPeople: this.portionSizeInput,
      preparationTime: this.preparationTimeInput
    }
    sessionStorage.setItem(this.sessionStorageToken, JSON.stringify(userInputs))
  }
  private loadUserInputs(){
    const sessionStorageData = sessionStorage.getItem(this.sessionStorageToken);
    if (sessionStorageData) {
      const userInputs: AddDishFormData = sessionStorageData ? JSON.parse(sessionStorageData) : null;

      this.dishNameInput = userInputs.name;
      this.descriptionInput = userInputs.description;
      this.imageInput = userInputs.image;
      this.selectedTypes = userInputs.types;
      //this.seasonFormControl.value = userInputs.season;
      this.selectedIngredients = userInputs.ingredients; 
      this.createdSteps = userInputs.steps;
      this.portionSizeInput = userInputs.amountOfPeople;
      this.preparationTimeInput = userInputs.preparationTime;
    }
  }

  /* ### TEXT INPUTS ### */
  dishNameInput: string = '';
  descriptionInput: string = '';
  imageInput: string = '';

  private initialiseUserTextInputs(){
    this.dishNameInput = '';
    this.descriptionInput = '';
    this.imageInput = '';
  }
  textInputsIsValid(): boolean {
    const nameValid = (this.dishNameInput !== '');
    const descriptionValid = (this.descriptionInput.length < 255);
    const imageValid = (this.dishNameInput !== '');

    return (nameValid && descriptionValid && imageValid);
  }

  /* ### TYPES ### */
    /* TODO GET TYPES FROM API */
  types: Array<DishType> = [];
  suggestedTypes: Array<string> = this.convertDishTypesToStrings(this.types);
  selectedTypes: Array<DishType> = [];
  typeInput: string = '';

  addType(typeName: string){
    if (!this.convertDishTypesToStrings(this.selectedTypes).includes(typeName)) {
      const newType: DishType = { name: typeName, id: 1}
      
      this.selectedTypes.push(newType);

      this.initialiseUserTypesInput()
      this.saveUserInputs();
    }
  }
  removeType(type: DishType){
    const removalIndex: number = this.selectedTypes.indexOf(type);
    this.selectedTypes.splice(removalIndex, 1);

    this.saveUserInputs();
  }
  filterTypes(){
    const typeFilterInput = this.typeInput.toLowerCase();

    // Show only results matching the typed input
    const typesFilteredByInput = this.convertDishTypesToStrings(this.types).filter(type => type.toLowerCase().includes(typeFilterInput));

    // Show only results that haven't been selected yet
    this.suggestedTypes = typesFilteredByInput.filter(type => !this.convertDishTypesToStrings(this.selectedTypes).includes(type));
  }
  private initialiseUserTypesInput(){
    this.typeInput = '';
    this.filterTypes();
  }

  private convertDishTypesToStrings(arrayToConvert: Array<DishType>): Array<string>{
    return arrayToConvert.map((type) => type.name);
  }

  /* ### INGREDIENTS ### */
  ingredients: Array<Ingredient> = []; // API DATA
  suggestedIngredients: Array<IngredientPostData> = []; // AUTOCOMPLETE-SUGGESTIONS
  selectedIngredients: Array<IngredientPostData> = []; // DATA IN TABLE
  ingredientNameInput: string = ''; // INGREDIENT-NAME INPUT VALUE
  ingredientAmountInput: number = 0; // INGREDIENT-AMOUNT INPUT VALUE
  ingredientToAdd: IngredientPostData = {id: 0,name: '', amount: {value: 0, unit: 'gr'}}; // Post-data to save in selectedIngredients

  addIngredient(){
    if (this.ingredientToAddIsValid()) { // Check if input-field is valid
      let tempList = [...this.selectedIngredients]; // Make templist, Angular needs the full array to be updated to update the table.

      tempList.push(this.ingredientToAdd); // Add ingredient to list
      this.selectedIngredients = tempList; // Copy tempList to selectedIngredients

      this.initialiseUserIngredientInput(); // Set input-field back to its initial values
      this.saveUserInputs();
    }
  }
  removeIngredient(ingredientToRemove: IngredientPostData){
    let removalIndex: number = this.selectedIngredients.indexOf(ingredientToRemove);

    const tempList = this.selectedIngredients.filter(ingredient => ingredient !== ingredientToRemove); // We make a templist and then overwrite the selectedIngredientslist => Angular needs this to properly update the table.
    this.selectedIngredients = tempList;

    this.saveUserInputs();
  }
  setIngredientToAddData(selectedIngredient: IngredientPostData){
    this.ingredientToAdd.id = selectedIngredient.id;
    this.ingredientToAdd.name = selectedIngredient.name;
    this.ingredientToAdd.amount.unit = selectedIngredient.amount.unit;
  }
  setIngredientToAddAmountValue(){
    this.ingredientToAdd.amount.value = this.ingredientAmountInput;
  }
  ingredientToAddIsValid(): boolean{
    // Check name
    const nameIsValid: boolean = (this.ingredients.some((ingredient)=> ingredient.name === this.ingredientToAdd.name));

    // Check if ID is correct
    let idIsValid: boolean = false;
    if (nameIsValid && (this.ingredientToAdd.id !== 0)) {
      const index: number = this.ingredients.findIndex((ingredient)=> ingredient.name === this.ingredientToAdd.name);
      idIsValid = (this.ingredients[index].id === this.ingredientToAdd.id);
    }

    // Check amount is NOT 0 or empty
    const amountIsValid: boolean = ((this.ingredientToAdd.amount.value !== 0) && (this.ingredientToAdd.amount.value !== null));

    // Return result
    return (idIsValid && nameIsValid && amountIsValid);
  }
  filterIngredients(){
    // set filter-input to lowercase & make a temporary array of ingredients which has the type IngredientPostData instead of Ingredient.
    const ingredientFilterInput = this.ingredientNameInput.toLowerCase();

    // Show only results matching the typed input
    const ingredientsFilteredByInput: Array<IngredientPostData> = this.ingredients
      .map(ingredient => this.convertToIngredientPostData(ingredient)) // Convert list from type Array<Ingredients> to Array<IngredientPostData>
      .filter(ingredient => ingredient.name.toLowerCase().includes(ingredientFilterInput)); // Filter for names that match the userinput

    // Show only results that haven't been selected yet
    const selectedIngredientNames: Array<string> = this.selectedIngredients.map(ingredient => ingredient.name);
    this.suggestedIngredients = ingredientsFilteredByInput.filter(ingredient => !selectedIngredientNames.includes(ingredient.name));
  }
  private initialiseUserIngredientInput() {
    // Set 'IngredientToAdd' & IngredientInput back to it's empty values
    this.ingredientNameInput = '';
    this.ingredientAmountInput = 0;
    this.ingredientToAdd = {
      id: 0,
      name: this.ingredientNameInput,
      amount: {value: this.ingredientAmountInput, unit: 'gr'}
    };
  }
  private convertToIngredientPostData(ingredient: Ingredient): IngredientPostData{
    // turns a variable of type Ingredient to a variable of type IngredientPostData
    return {
      id: ingredient.id,
      name: ingredient.name,
      amount: {value: 0, unit: 'gr'}
    };
  }
  /* ### DISH DETAILS ### */
  portionSizeInput: number = 0;
  preparationTimeInput: number = 0;
  seasons: Array<string> = [];
  seasonFormControl = new FormControl('', [Validators.required]); // use seasonFormControl.value to get the selected value

  initialiseUserDetailsInput(){
    this.portionSizeInput = 0;
    this.preparationTimeInput = 0;
    this.seasonFormControl.reset();
  }

  dishDetailsAreValid(): boolean {
    const portionValid: boolean = (this.portionSizeInput !== 0);
    const timeValid: boolean = (this.preparationTimeInput !== 0);
    const seasonValid: boolean = (this.seasonFormControl.value !== '');
  
    return portionValid && timeValid && seasonValid;
  }

  /* ### DISH STEPS ### */
  stepToAdd: DishStep = {title: '', description: '', order: 0};
  createdSteps: Array<DishStep> = [];

  addStep(){
    if (this.stepToAddIsValid()){
      let tempList: Array<DishStep> = [...this.createdSteps];

      tempList.push(this.stepToAdd);
      this.createdSteps = tempList;
  
      this.initialiseCreatedStepsOrders();
      this.initialiseUserStepInput();
      this.saveUserInputs();
    }
  }
  removeStep(stepToRemove: DishStep){
    let removalIndex: number = this.createdSteps.indexOf(stepToRemove);

    const tempList: Array<DishStep> = this.createdSteps.filter(step => step !== stepToRemove); // We make a templist and then overwrite the selectedIngredientslist => Angular needs this to properly update the table.
    this.createdSteps = tempList;

    this.initialiseCreatedStepsOrders();
    this.saveUserInputs();
  }
  stepToAddIsValid(): boolean{
    // Check name (not empty)
    const titleIsValid: boolean = (this.stepToAdd.title !== '');

    // Check description (smaller than 255 characters)
    const descriptionIsValid: boolean = (this.stepToAdd.description!.length <= 255);

    // Return result
    return (titleIsValid && descriptionIsValid);
  }
  moveStepUp(stepToMove: DishStep){
    if (stepToMove.order > 1) { // Step 1 can't be moved up => if larger than one
      let tempList: Array<DishStep> = [...this.createdSteps];

      const oldIndex: number = this.createdSteps.indexOf(stepToMove);
      const newIndex: number = oldIndex - 1;

      tempList[oldIndex] = tempList[newIndex]; // Overwrite value of stepToMove
      tempList[newIndex] = stepToMove; // Put stepToMove in new position

      this.createdSteps = tempList;
      
      this.initialiseCreatedStepsOrders();
    }
  }
  moveStepDown(stepToMove: DishStep){
    if (stepToMove.order < this.createdSteps.length) { // Last step can't be moved down => if smaller than length
      let tempList: Array<DishStep> = [...this.createdSteps];

      const oldIndex: number = this.createdSteps.indexOf(stepToMove);
      const newIndex: number = oldIndex + 1;

      tempList[oldIndex] = tempList[newIndex]; // Overwrite value of stepToMove
      tempList[newIndex] = stepToMove; // Put stepToMove in new position

      this.createdSteps = tempList;
      
      this.initialiseCreatedStepsOrders();  
    }
  }
  private initialiseUserStepInput(){
    this.stepToAdd = {title: '', description: '', order: 0};
  }
  private initialiseCreatedStepsOrders(){
    for (let i = 0; i < this.createdSteps.length; i++) {
      this.createdSteps[i].order = i + 1;
    }
  }
}