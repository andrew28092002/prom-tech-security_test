import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import items from './../../../assets/data/data.json';
import { TItem } from 'src/assets/types/item';
import { LocalService } from 'src/app/local.service';
import { genre } from 'src/assets/data/genre';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit, DoCheck {
  value = '';
  items: TItem[] = items;
  favoriteItems: TItem[] = [];
  genre = genre;
  selectedGenre: string = 'all';

  constructor(private LocalStorage: LocalService) {}

  ngDoCheck(): void {
    this.sort();
  }

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

    this.LocalStorage.saveData('favorite', JSON.stringify(this.favoriteItems));
  }

  checkIsFavorite(item: TItem){
    return this.favoriteItems.filter(favoriteItem => favoriteItem.id === item.id).length > 0
  }

  sort() {
    if (this.selectedGenre !== 'all') {
      const sortedByGenre = items.filter((item) =>
        item.genre.forEach((genre) => genre === Number(this.selectedGenre))
      );

      console.log(sortedByGenre);
    }
  }
}
