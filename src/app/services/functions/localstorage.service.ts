import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  token = new localStorageData('token');
  userId = new localStorageData('user_id', true);
  loginId = new localStorageData('login_id', true);
}

class localStorageData {
  private key: string;
  private dataIsNumber: boolean;

  constructor( 
    key: string,
    dataIsNumber: boolean = false,
    ){
    this.key = key;
    this.dataIsNumber = dataIsNumber;
  }

  set(value: any){
    const valueIsNotString = (typeof value !== 'string');
    if (!valueIsNotString) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(this.key, value);
  }
  get(){
    let item: string | number | null = localStorage.getItem(this.key);
    if (item !== null) {
      if (this.dataIsNumber) {
        return parseInt(item, 10);
      } else {
        return JSON.parse(item);
      }
    }
    return null;
  }
  remove(){
    localStorage.removeItem(this.key);
  }
}
