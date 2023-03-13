import { Component, OnInit } from '@angular/core';
import items from './../../../assets/data/data.json';
import { TItem } from 'src/assets/types/item';
import { LocalService } from 'src/app/local.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  value = '';
  items: TItem[] = items;
  favoriteItems: TItem[] = [];

  constructor(private LocalStorage: LocalService) {}
  ngOnInit(): void {
    const dataFromStorage = this.LocalStorage.getData('favorite');

    if (dataFromStorage) {
      this.favoriteItems = JSON.parse(dataFromStorage);
    }
  }

  toggleFavoriteItem(film: TItem) {
    if (this.favoriteItems.filter((item) => item.id === film.id).length > 0) {
      this.favoriteItems = this.favoriteItems.filter(
        (item) => item.id !== film.id
      );
    } else {
      this.favoriteItems.push(film);
    }

    this.LocalStorage.saveData(
      'favorite',
      JSON.stringify(this.favoriteItems)
    );
  }
}
