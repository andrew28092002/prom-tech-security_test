import { Injectable } from '@angular/core';
import { TItem } from 'src/assets/types/item';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public toggleFavoriteItem(name: string, item: TItem) {
    const stringifyFavoriteIds = this.getData(name);

    if (stringifyFavoriteIds) {
      const parsedFavoriteIds: TItem[] = JSON.parse(stringifyFavoriteIds);

      parsedFavoriteIds.filter(favorItem => favorItem.id === item.id).length > 0
        ? this.saveData(
            'favorite',
            JSON.stringify(parsedFavoriteIds.filter(favorItem => favorItem.id === item.id))
          )
        : this.saveData('favorite', JSON.stringify([...parsedFavoriteIds, item]));
    } else {
      this.saveData(name, JSON.stringify([item]));
    }
  }
}
