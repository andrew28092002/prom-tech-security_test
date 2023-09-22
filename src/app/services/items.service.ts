import { Injectable } from '@angular/core';
import { Item } from 'src/assets/types/item';
import items from './../../assets/data/data.json';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _items: Item[] = items

  constructor() {}

  like(item: Item) {
    this._items.map(i => {
      if (i.id === item.id) {
        i.isFavorite = true
      }
      return i
    })
  }

  get items(){
    return this._items
  }

  get favoriteItems(){
    return this._items.filter(i => i.isFavorite)
  }
}
