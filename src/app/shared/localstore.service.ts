import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalstoreService {

  constructor() { }

  getLocal(modulee, key) {
    let modObj = JSON.parse(localStorage.getItem(modulee));
    if (modObj == undefined) {
      modObj = {};
      localStorage.setItem(modulee, JSON.stringify(modObj));
    }
    if (key != undefined) return modObj[key];
    return modObj;
  }

  setLocal(modulee, key, data) {
    let modObj = JSON.parse(localStorage.getItem(modulee));
    if (modObj == undefined) {
      modObj = {};
    }
    modObj[key] = data;
    localStorage.setItem(modulee, JSON.stringify(modObj));
  }

  removeLocalStorageObj(modulee, key) {
    let modObj = JSON.parse(localStorage.getItem(modulee));
    if(modObj[key]){
      modObj[key] = undefined;
    }
    localStorage.setItem(modulee, JSON.stringify(modObj));
  }

  lastAction(key, val){
    localStorage.setItem(key, val);
  }

  getLastAction(key){
    return localStorage.getItem(key);
  }

  removeLocal(key) {
    localStorage.removeItem(key);
  }

}
