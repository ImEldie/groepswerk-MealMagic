import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdddishCardComponent } from '../adddish-card/adddish-card.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DishSeason } from '../../../interfaces/interfaces-seasons';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DishType } from '../../../interfaces/interfaces-types';
import { MatIconModule } from '@angular/material/icon';
import { TypesApiService } from '../../../services/api-calls/types-api.service';
import { SeasonsApiService } from '../../../services/api-calls/seasons-api.service';
import { AddDishDetailInputs } from '../../../interfaces/interfaces-add-dish-forms';

@Component({
  selector: 'app-adddish-details-form',
  standalone: true,
  imports: [AdddishCardComponent, MatInputModule, FormsModule, MatButtonToggleModule, MatChipsModule, MatAutocompleteModule, MatIconModule],
  templateUrl: './adddish-details-form.component.html',
  styleUrl: './adddish-details-form.component.css'
})
export class AdddishDetailsFormComponent implements OnInit {
  portionSizeInput: number = 0;
  preparationTimeInput: number = 0;

  selectedSeason: DishSeason | undefined;

  selectedTypes: Array<DishType> = [];
  suggestedTypes: Array<string> = [];
  typeInput: string = '';

  constructor(
    private typesApi: TypesApiService,
    private seasonsApi: SeasonsApiService,
  ){};

  ngOnInit(){
    this.typesApi.loadTypesFromApi();
    this.seasonsApi.loadSeasonsFromApi();
  }

  checkInputsValidity(): boolean {
    const portionSizeValid = (this.portionSizeInput !== 0);
    const prepTimeValid = (this.preparationTimeInput !== 0);
    const seasonSelected = (this.selectedSeason !== undefined);
    const typesSelected = (this.selectedTypes.length !== 0);

    return portionSizeValid && prepTimeValid && seasonSelected && typesSelected;
  }

  // CARD-OUTPUT
  @Output() UserInputData = new EventEmitter<AddDishDetailInputs>();
  
  emitUserInput(){
    this.UserInputData.emit(this.getEmitData());
  }

  private getEmitData(): AddDishDetailInputs {
    const selectedSeasonId = (this.selectedSeason !== undefined) ? this.selectedSeason.id : 0; 

    const emitData: AddDishDetailInputs = {
      portionSize: this.portionSizeInput,
      prepTime: this.preparationTimeInput,
      seasonId: selectedSeasonId,
      selectedTypeIds: this.selectedTypes.map(type => type.id),
      dataIsValid: this.checkInputsValidity()
    }
    
    return emitData;
  }

  // CARD FUNCTIONS
  getApiSeasons(): Array<DishSeason> {
    return this.seasonsApi.getseasonsList();
  }
  setSelectedSeason(newSeason: DishSeason) {
    this.selectedSeason = newSeason;
    this.emitUserInput();
  }

  getApiTypes(): Array<DishType> {
    return this.typesApi.getTypesList();
  }

  addType(typeName: string){
    if (!this.convertDishTypesToStrings(this.selectedTypes).includes(typeName)) {
      const newType: DishType = { name: typeName, id: 1}
      
      this.selectedTypes.push(newType);

      this.typeInput = '';
      this.filterTypes();
      this.emitUserInput();
    }
  }
  removeType(type: DishType){
    const removalIndex: number = this.selectedTypes.indexOf(type);
    this.selectedTypes.splice(removalIndex, 1);
  }
  filterTypes(){
    const filterInput = this.typeInput.toLowerCase();
    const apiTypes = this.getApiTypes();

    let filteredTypes = this.convertDishTypesToStrings(apiTypes).filter(type => type.toLowerCase().includes(filterInput));
    filteredTypes = filteredTypes.filter(typeName => !this.convertDishTypesToStrings(this.selectedTypes).includes(typeName));
    
    this.suggestedTypes = filteredTypes;
  }
  private convertDishTypesToStrings(arrayToConvert: Array<DishType>): Array<string>{
    return arrayToConvert.map((type) => type.name);
  }


}
