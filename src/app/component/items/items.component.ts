import { Component, OnInit } from '@angular/core';
import items from './../../../assets/data/data.json';
import { TItem } from 'src/assets/types/item';
import { LocalService } from 'src/app/local.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit{
  value = '';
  items: TItem[] = items;
  favouriteItems: TItem[] = [];

  constructor(private LocalStorage: LocalService) {}
  ngOnInit(): void {
    const dataFromStorage = this.LocalStorage.getData('favourite')

    if (dataFromStorage){
      this.favouriteItems = JSON.parse(dataFromStorage)
    }
  }

  toggleFavouriteItem(film: TItem) {
    if (this.favouriteItems.filter((item) => item.id === film.id).length > 0) {
      this.favouriteItems = this.favouriteItems.filter(
        (item) => item.id !== film.id
      );
    } else {
      this.favouriteItems.push(film);
    }

    console.log(this.favouriteItems)

    this.LocalStorage.saveData(
      'favourite',
      JSON.stringify(this.favouriteItems)
    );
  }
  
}
