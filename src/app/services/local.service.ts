import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  public saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }
}
