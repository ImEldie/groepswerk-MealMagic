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
    if (this.dataIsNumber) {
      localStorage.setItem(this.key, value);
    } else {
      const storageObject = this.convertToObjectString(value);
      localStorage.setItem(this.key, storageObject);
    }
    
  }
  get(){
    let value: string | number | null = localStorage.getItem(this.key);
    if (value !== null) {
      if (this.dataIsNumber) {
        return parseInt(value, 10);
      } else {
        const result = JSON.parse(value);
        return result.data;
      }
    }
    return null;
  }
  remove(){
    localStorage.removeItem(this.key);
  }

  private convertToObjectString(value: string | number): string {
    const storageObject = {data: value};
    return JSON.stringify(storageObject);
  }
}
